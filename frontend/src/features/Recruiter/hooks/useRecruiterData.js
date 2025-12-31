import { useState, useEffect, useCallback } from 'react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';

export const useRecruiterData = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        pendingApplications: 0,
        interviews: 0
    });
    const { toast } = useToast();

    // Fetch Jobs
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/jobs?limit=50&page=1');
            const list = res?.data || res?.jobs || res || [];
            const jobsArray = Array.isArray(list) ? list : [];
            
            // Map jobs to match component props
            const mappedJobs = jobsArray.map(job => ({
                ...job,
                id: job._id || job.id,
                title: job.tieuDe || job.title,
                status: job.trangThai || 'active',
                statusText: getStatusText(job.trangThai || job.status),
                applicants: job.soLuongUngVien || job.applicants || 0,
                views: job.luotXem || job.views || 0
            }));
            
            setJobs(mappedJobs);
        } catch (err) {
            console.warn('fetchJobs failed', err.message);
            toast?.error('Không thể tải danh sách việc làm');
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    // Fetch Recent Candidates (Applications)
    const fetchCandidates = useCallback(async () => {
        try {
            const res = await api.get('/applications?limit=10&sort=-ngayNop');
            const list = res?.data || res?.applications || res || [];
            const appsArray = Array.isArray(list) ? list : [];
            
            // Map applications to candidate format
            const mappedCandidates = appsArray.map(app => {
                // Safely extract rating - handle both number and object
                let rating = 4.0;
                if (typeof app.danhGia === 'number') {
                    rating = app.danhGia;
                } else if (app.danhGia && typeof app.danhGia === 'object' && typeof app.danhGia.diem === 'number') {
                    rating = app.danhGia.diem;
                }

                // Safely extract skills
                let skills = [];
                if (Array.isArray(app.ungVien?.kyNang)) {
                    skills = app.ungVien.kyNang.filter(s => typeof s === 'string');
                } else if (Array.isArray(app.ungVien?.skills)) {
                    skills = app.ungVien.skills.filter(s => typeof s === 'string');
                }

                return {
                    id: app._id || app.id,
                    name: app.ungVien?.hoTen || app.ungVien?.name || 'Không có tên',
                    email: app.ungVien?.email || '',
                    avatar: app.ungVien?.anhDaiDien || app.ungVien?.avatar || '',
                    position: app.tinTuyenDung?.tieuDe || app.tinTuyenDung?.title || 'Không có vị trí',
                    location: app.ungVien?.diaChi || 'Ho Chi Minh City',
                    rating: rating,
                    appliedDate: formatDate(app.ngayNop),
                    status: app.trangThai || 'pending',
                    statusText: getApplicationStatusText(app.trangThai),
                    skills: skills,
                    raw: app
                };
            });
            
            setCandidates(mappedCandidates);
        } catch (err) {
            console.warn('fetchCandidates failed', err.message);
            setCandidates([]);
        }
    }, []);

    // Fetch Interviews
    const fetchInterviews = useCallback(async () => {
        try {
            const res = await api.get('/interviews?limit=10&sort=thoiGian');
            const list = res?.data || res?.interviews || res || [];
            const interviewsArray = Array.isArray(list) ? list : [];
            
            // Map interviews to component format
            const mappedInterviews = interviewsArray.map(interview => {
                const date = new Date(interview.thoiGian || interview.time);
                return {
                    id: interview._id || interview.id,
                    candidateName: interview.ungVien?.hoTen || interview.candidateName || '—',
                    position: interview.tinTuyenDung?.tieuDe || interview.position || '',
                    time: formatTime(interview.thoiGian || interview.time),
                    day: date.getDate(),
                    month: getMonthName(date.getMonth()),
                    location: interview.diaDiem || interview.location || 'Online',
                    interviewer: interview.nguoiPhongVan?.hoTen || interview.interviewer,
                    status: interview.trangThai,
                    raw: interview
                };
            });
            
            setInterviews(mappedInterviews);
        } catch (err) {
            console.warn('fetchInterviews failed', err.message);
            setInterviews([]);
        }
    }, []);

    // Fetch Dashboard Stats
    const fetchStats = useCallback(async () => {
        try {
            const res = await api.get('/reports/dashboard');
            const data = res?.data || res || {};
            setStats({
                totalJobs: data.tongSoTinTuyenDung || data.totalJobs || 0,
                activeJobs: data.tinTuyenDungDangHoatDong || data.activeJobs || 0,
                pendingApplications: data.ungVienChoXuLy || data.pendingApplications || 0,
                interviews: data.soLuongPhongVan || data.interviews || 0
            });
        } catch (err) {
            // If 403, user might not have permission - use fallback stats
            console.warn('fetchStats failed:', err.message);
            
            // Try to calculate basic stats from available data
            setStats({
                totalJobs: 0,
                activeJobs: 0,
                pendingApplications: 0,
                interviews: 0
            });
        }
    }, []);

    // Add Job
    const addJob = async (jobData) => {
        try {
            const res = await api.post('/jobs', jobData);
            const created = res?.data || res;
            if (created) {
                const mappedJob = {
                    ...created,
                    id: created._id || created.id,
                    title: created.tieuDe || created.title,
                    status: created.trangThai || 'active',
                    statusText: getStatusText(created.trangThai),
                    applicants: 0,
                    views: 0
                };
                setJobs(prev => [mappedJob, ...prev]);
                toast?.success('Tạo tin tuyển dụng thành công');
            }
            return created;
        } catch (err) {
            toast?.error('Không thể tạo tin tuyển dụng');
            throw err;
        }
    };

    // Update Job
    const updateJob = async (id, updates) => {
        try {
            const res = await api.put(`/jobs/${id}`, updates);
            const updated = res?.data || res;
            if (updated) {
                const mappedJob = {
                    ...updated,
                    id: updated._id || updated.id,
                    title: updated.tieuDe || updated.title,
                    status: updated.trangThai || 'active',
                    statusText: getStatusText(updated.trangThai),
                    applicants: updated.soLuongUngVien || updated.applicants || 0,
                    views: updated.luotXem || updated.views || 0
                };
                setJobs(prev =>
                    prev.map(j => (j._id === id || j.id === id ? mappedJob : j))
                );
                toast?.success('Cập nhật tin tuyển dụng thành công');
            }
            return updated;
        } catch (err) {
            toast?.error('Không thể cập nhật tin tuyển dụng');
            throw err;
        }
    };

    // Delete Job
    const deleteJob = async (id) => {
        try {
            await api.delete(`/jobs/${id}`);
            setJobs(prev => prev.filter(j => !(j._id === id || j.id === id)));
            toast?.success('Xóa tin tuyển dụng thành công');
        } catch (err) {
            toast?.error('Không thể xóa tin tuyển dụng');
            throw err;
        }
    };

    // Get Applications by Job
    const getApplicationsByJob = async (jobId) => {
        try {
            const res = await api.get(`/applications/job/${jobId}`);
            const list = res?.data || res || [];
            return Array.isArray(list) ? list : list.data || [];
        } catch (err) {
            console.error('getApplicationsByJob error', err.message);
            toast?.error('Không thể tải ứng viên');
            return [];
        }
    };

    // Schedule Interview
    const scheduleInterview = async (interviewData) => {
        try {
            const res = await api.post('/interviews', interviewData);
            const created = res?.data || res;
            if (created) {
                await fetchInterviews();
                toast?.success('Đã lên lịch phỏng vấn');
            }
            return created;
        } catch (err) {
            toast?.error('Không thể lên lịch phỏng vấn');
            throw err;
        }
    };

    // Reschedule Interview
    const rescheduleInterview = async (id, newTime) => {
        try {
            const res = await api.put(`/interviews/${id}`, { thoiGian: newTime });
            const updated = res?.data || res;
            if (updated) {
                await fetchInterviews();
                toast?.success('Đã đổi lịch phỏng vấn');
            }
            return updated;
        } catch (err) {
            toast?.error('Không thể đổi lịch phỏng vấn');
            throw err;
        }
    };

    // Cancel Interview
    const cancelInterview = async (id) => {
        try {
            await api.delete(`/interviews/${id}`);
            setInterviews(prev => prev.filter(i => i.id !== id));
            toast?.success('Đã hủy lịch phỏng vấn');
        } catch (err) {
            toast?.error('Không thể hủy lịch phỏng vấn');
            throw err;
        }
    };

    // Update Application Status
    const updateApplicationStatus = async (applicationId, status) => {
        try {
            const res = await api.put(`/applications/${applicationId}`, {
                trangThai: status
            });
            toast?.success('Cập nhật trạng thái thành công');
            return res?.data || res;
        } catch (err) {
            toast?.error('Không thể cập nhật trạng thái');
            throw err;
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchJobs();
        fetchCandidates();
        fetchInterviews();
        fetchStats();
    }, [fetchJobs, fetchCandidates, fetchInterviews, fetchStats]);

    // Calculate stats from local data if API fails
    useEffect(() => {
        if (stats.totalJobs === 0 && jobs.length > 0) {
            const activeJobsCount = jobs.filter(j => j.status === 'active' || j.trangThai === 'active').length;
            const pendingCount = candidates.filter(c => c.status === 'pending' || c.status === 'cho-xu-ly').length;
            
            setStats({
                totalJobs: jobs.length,
                activeJobs: activeJobsCount,
                pendingApplications: pendingCount,
                interviews: interviews.length
            });
        }
    }, [jobs, candidates, interviews, stats.totalJobs]);

    return {
        loading,
        jobs,
        candidates,
        interviews,
        stats,
        addJob,
        updateJob,
        deleteJob,
        getApplicationsByJob,
        scheduleInterview,
        rescheduleInterview,
        cancelInterview,
        updateApplicationStatus,
        refetch: () => {
            fetchJobs();
            fetchCandidates();
            fetchInterviews();
            fetchStats();
        }
    };
};

// Helper functions
function getStatusText(status) {
    const statusMap = {
        'active': 'Đang tuyển',
        'dang-tuyen': 'Đang tuyển',
        'closed': 'Đã đóng',
        'da-dong': 'Đã đóng',
        'draft': 'Bản nháp',
        'ban-nhap': 'Bản nháp'
    };
    return statusMap[status] || 'Đang tuyển';
}

function getApplicationStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'cho-xu-ly': 'Chờ xử lý',
        'reviewing': 'Đang xem xét',
        'dang-xem-xet': 'Đang xem xét',
        'interview': 'Phỏng vấn',
        'phong-van': 'Phỏng vấn',
        'accepted': 'Chấp nhận',
        'chap-nhan': 'Chấp nhận',
        'rejected': 'Từ chối',
        'tu-choi': 'Từ chối'
    };
    return statusMap[status] || 'Chờ xử lý';
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function formatTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function getMonthName(month) {
    const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 
                   'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
    return months[month];
}