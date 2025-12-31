import React, { useState } from 'react';
import CandidateList from '@features/Recruiter/components/CandidateList';
import InterviewSchedule from '@features/Recruiter/components/InterviewSchedule';
import JobPostingCard from '@features/Recruiter/components/JobPostingCard';
import JobPostingForm from '@features/Recruiter/components/JobPostingForm';
import StatCard from '@features/Student/components/StatCard';
import { useRecruiterData } from '@features/Recruiter/hooks/useRecruiterData';
import confirmAction from '@utils/confirmAction';
import Modal from '@components/common/Modal/Modal';
import { useToast } from '@hooks/useToast';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
    const {
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
        updateApplicationStatus
    } = useRecruiterData();
    const { toast } = useToast();

    // Modal states
    const [jobFormModalOpen, setJobFormModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appsModalOpen, setAppsModalOpen] = useState(false);
    const [appsLoading, setAppsLoading] = useState(false);
    const [applications, setApplications] = useState([]);
    const [applicationsJobTitle, setApplicationsJobTitle] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [interviewFormOpen, setInterviewFormOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    // Filter states
    const [candidateFilter, setCandidateFilter] = useState('all');
    const [candidateSort, setCandidateSort] = useState('-appliedDate');

    const statsData = [
        {
            icon: '📋',
            value: stats.totalJobs || 0,
            label: 'Tin tuyển dụng',
            color: 'blue'
        },
        {
            icon: '👥',
            value: stats.activeJobs || 0,
            label: 'Ứng viên mới',
            color: 'teal'
        },
        {
            icon: '📋',
            value: stats.pendingApplications || 0,
            label: 'Chờ phỏng vấn',
            color: 'orange'
        },
        {
            icon: '✅',
            value: stats.interviews || 0,
            label: 'Đã tuyển',
            color: 'green'
        }
    ];

    // Job Actions
    const handleCreateJob = () => {
        setSelectedJob(null);
        setJobFormModalOpen(true);
    };

    const handleEditJob = (job) => {
        setSelectedJob(job);
        setJobFormModalOpen(true);
    };

    const handleDeleteJob = async (job) => {
        const ok = await confirmAction(
            `Bạn có chắc muốn xóa tin "${job.title}"?`
        );
        if (!ok) return;
        try {
            const id = job._id || job.id;
            await deleteJob(id);
        } catch (err) {
            console.error('deleteJob failed', err);
        }
    };

    const handleJobSubmit = async (formData) => {
        try {
            if (selectedJob) {
                const id = selectedJob._id || selectedJob.id;
                await updateJob(id, formData);
            } else {
                await addJob(formData);
            }
            setJobFormModalOpen(false);
            setSelectedJob(null);
        } catch (err) {
            console.error('Job submit failed', err);
        }
    };

    // Application Actions
    const handleViewApplications = async (job) => {
        setApplications([]);
        setApplicationsJobTitle(job.tieuDe || job.title || 'Ứng viên');
        setAppsModalOpen(true);
        setAppsLoading(true);
        try {
            const id = job._id || job.id;
            const apps = await getApplicationsByJob(id);
            setApplications(apps || []);
        } catch (err) {
            toast?.error('Lỗi khi tải danh sách ứng viên');
        } finally {
            setAppsLoading(false);
        }
    };

    const handleViewProfile = (candidate) => {
        setSelectedApplication(candidate.raw || candidate);
    };

    const handleInviteToInterview = (application) => {
        setSelectedCandidate(application);
        setInterviewFormOpen(true);
    };

    const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
        try {
            await updateApplicationStatus(applicationId, newStatus);
            // Refresh applications list
            const currentJob = jobs.find(
                j => j.title === applicationsJobTitle || j.tieuDe === applicationsJobTitle
            );
            if (currentJob) {
                const id = currentJob._id || currentJob.id;
                const apps = await getApplicationsByJob(id);
                setApplications(apps || []);
            }
        } catch (err) {
            console.error('Update status failed', err);
        }
    };

    // Interview Actions
    const handleScheduleInterview = (candidate) => {
        setSelectedCandidate(candidate);
        setInterviewFormOpen(true);
    };

    const handleInterviewSubmit = async (interviewData) => {
        try {
            await scheduleInterview({
                ...interviewData,
                ungVien: selectedCandidate?.id || selectedCandidate?._id,
                tinTuyenDung: selectedCandidate?.jobId
            });
            setInterviewFormOpen(false);
            setSelectedCandidate(null);
        } catch (err) {
            console.error('Schedule interview failed', err);
        }
    };

    const handleRescheduleInterview = async (interview) => {
        const newTime = prompt(
            'Nhập thời gian mới (YYYY-MM-DD HH:mm):',
            interview.time
        );
        if (newTime) {
            try {
                await rescheduleInterview(interview.id, newTime);
            } catch (err) {
                console.error('Reschedule failed', err);
            }
        }
    };

    const handleCancelInterview = async (interview) => {
        const ok = await confirmAction(
            `Bạn có chắc muốn hủy lịch phỏng vấn với ${interview.candidateName}?`
        );
        if (ok) {
            try {
                await cancelInterview(interview.id);
            } catch (err) {
                console.error('Cancel interview failed', err);
            }
        }
    };

    // Filter and Sort
    const filteredCandidates = candidates.filter(c => {
        if (candidateFilter === 'all') return true;
        return c.status === candidateFilter;
    });

    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        if (candidateSort === '-appliedDate') {
            return new Date(b.appliedDate) - new Date(a.appliedDate);
        } else if (candidateSort === 'name') {
            return a.name.localeCompare(b.name);
        } else if (candidateSort === '-rating') {
            return b.rating - a.rating;
        }
        return 0;
    });

    return (
        <div className="dashboard">
            <main className="mainContent">
                {/* Stats Grid */}
                <div className="statsGrid">
                    {statsData.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Job Posting Banner */}
                <div className="banner">
                    <div className="bannerContent">
                        <div className="bannerText">
                            <h2>Tạo tin tuyển dụng mới</h2>
                            <p>
                                Đăng tin tuyển dụng để tìm ứng viên tốt nhất cho
                                doanh nghiệp
                            </p>
                        </div>
                        <button className="bannerBtn" onClick={handleCreateJob}>
                            + Tạo tin mới
                        </button>
                    </div>
                </div>

                {/* Jobs Section */}
                <div className="contentSection">
                    <div className="sectionHeader">
                        <h2 className="sectionTitle">Tin tuyển dụng của tôi</h2>
                        <button className="viewAllBtn">Xem tất cả →</button>
                    </div>

                    {loading ? (
                        <div className="loadingState">Đang tải...</div>
                    ) : jobs.length === 0 ? (
                        <div className="emptyState">
                            <p>Chưa có tin tuyển dụng nào</p>
                            <button className="btnPrimary" onClick={handleCreateJob}>
                                Tạo tin đầu tiên
                            </button>
                        </div>
                    ) : (
                        <div className="jobGrid">
                            {jobs.slice(0, 6).map((job) => (
                                <JobPostingCard
                                    key={job._id || job.id}
                                    job={job}
                                    onEdit={handleEditJob}
                                    onDelete={handleDeleteJob}
                                    onViewApplications={handleViewApplications}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Candidates Section */}
                <div className="contentSection">
                    <div className="sectionHeader">
                        <h2 className="sectionTitle">Ứng viên mới nhất</h2>
                        <div className="sectionActions">
                            <select
                                className="filterBtn"
                                value={candidateFilter}
                                onChange={(e) => setCandidateFilter(e.target.value)}
                            >
                                <option value="all">Tất cả</option>
                                <option value="pending">Chờ xử lý</option>
                                <option value="reviewing">Đang xem xét</option>
                                <option value="interview">Phỏng vấn</option>
                                <option value="accepted">Đã nhận</option>
                                <option value="rejected">Từ chối</option>
                            </select>
                            <select
                                className="sortBtn"
                                value={candidateSort}
                                onChange={(e) => setCandidateSort(e.target.value)}
                            >
                                <option value="-appliedDate">Mới nhất</option>
                                <option value="name">Tên A-Z</option>
                                <option value="-rating">Đánh giá cao</option>
                            </select>
                        </div>
                    </div>

                    {sortedCandidates.length === 0 ? (
                        <div className="emptyState">
                            <p>Chưa có ứng viên nào</p>
                        </div>
                    ) : (
                        <CandidateList
                            candidates={sortedCandidates}
                            onViewProfile={handleViewProfile}
                            onScheduleInterview={handleScheduleInterview}
                        />
                    )}
                </div>

                {/* Interview Schedule Section */}
                <div className="contentSection">
                    <div className="sectionHeader">
                        <h2 className="sectionTitle">Lịch phỏng vấn sắp tới</h2>
                        <button className="viewAllBtn">Xem tất cả →</button>
                    </div>

                    {interviews.length === 0 ? (
                        <div className="emptyState">
                            <p>Chưa có lịch phỏng vấn nào</p>
                        </div>
                    ) : (
                        <InterviewSchedule
                            interviews={interviews.slice(0, 5)}
                            onReschedule={handleRescheduleInterview}
                            onCancel={handleCancelInterview}
                        />
                    )}
                </div>
            </main>

            {/* Job Form Modal */}
            <Modal
                isOpen={jobFormModalOpen}
                onClose={() => {
                    setJobFormModalOpen(false);
                    setSelectedJob(null);
                }}
                title={selectedJob ? 'Chỉnh sửa tin tuyển dụng' : 'Tạo tin tuyển dụng mới'}
                size="large"
            >
                <JobPostingForm
                    job={selectedJob}
                    onSubmit={handleJobSubmit}
                    onCancel={() => {
                        setJobFormModalOpen(false);
                        setSelectedJob(null);
                    }}
                />
            </Modal>

            {/* Applications Modal */}
            <Modal
                isOpen={appsModalOpen}
                onClose={() => setAppsModalOpen(false)}
                title={`Ứng viên cho: ${applicationsJobTitle}`}
                size="large"
            >
                {appsLoading ? (
                    <div style={{ padding: 20 }}>Đang tải...</div>
                ) : applications.length === 0 ? (
                    <div style={{ padding: 20, textAlign: 'center' }}>
                        <p>Chưa có ứng viên nào</p>
                    </div>
                ) : (
                    <CandidateList
                        candidates={applications.map((app) => {
                            // Safely extract rating
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
                                avatar: app.ungVien?.avatar || app.ungVien?.anhDaiDien || '',
                                position: app.tinTuyenDung?.tieuDe || app.tinTuyenDung?.title || '',
                                location: app.ungVien?.diaChi || 'Ho Chi Minh City',
                                appliedDate: app.ngayNop
                                    ? new Date(app.ngayNop).toLocaleDateString('vi-VN')
                                    : '',
                                status: app.trangThai || 'pending',
                                statusText: app.trangThai || 'Chờ xử lý',
                                rating: rating,
                                skills: skills,
                                raw: app
                            };
                        })}
                        onViewProfile={handleViewProfile}
                        onScheduleInterview={(candidate) =>
                            handleInviteToInterview(candidate.raw)
                        }
                    />
                )}
            </Modal>

            {/* Application Detail Modal */}
            <Modal
                isOpen={!!selectedApplication}
                onClose={() => setSelectedApplication(null)}
                title="Chi tiết ứng viên"
                size="default"
            >
                {selectedApplication && (
                    <div className="applicationDetail">
                        <div className="detailSection">
                            <h3>Thông tin cơ bản</h3>
                            <p>
                                <strong>Họ tên:</strong>{' '}
                                {selectedApplication.ungVien?.hoTen || '—'}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                {selectedApplication.ungVien?.email || '—'}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong>{' '}
                                {selectedApplication.ungVien?.soDienThoai || '—'}
                            </p>
                            <p>
                                <strong>Vị trí ứng tuyển:</strong>{' '}
                                {selectedApplication.tinTuyenDung?.tieuDe || '—'}
                            </p>
                            <p>
                                <strong>Ngày nộp:</strong>{' '}
                                {selectedApplication.ngayNop
                                    ? new Date(
                                          selectedApplication.ngayNop
                                      ).toLocaleDateString()
                                    : '—'}
                            </p>
                            <p>
                                <strong>Trạng thái:</strong>{' '}
                                <span className={`badge ${selectedApplication.trangThai}`}>
                                    {selectedApplication.trangThai}
                                </span>
                            </p>
                        </div>

                        <div className="detailSection">
                            <h3>Thư xin việc</h3>
                            <p>{selectedApplication.thuXinViec || 'Không có'}</p>
                        </div>

                        <div className="detailActions">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    handleInviteToInterview(selectedApplication);
                                    setSelectedApplication(null);
                                }}
                            >
                                Mời phỏng vấn
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    handleUpdateApplicationStatus(
                                        selectedApplication._id || selectedApplication.id,
                                        'accepted'
                                    )
                                }
                            >
                                Chấp nhận
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleUpdateApplicationStatus(
                                        selectedApplication._id || selectedApplication.id,
                                        'rejected'
                                    )
                                }
                            >
                                Từ chối
                            </button>
                            {selectedApplication.cv && (
                                <a
                                    href={selectedApplication.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                >
                                    Xem CV
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            {/* Interview Schedule Modal */}
            <Modal
                isOpen={interviewFormOpen}
                onClose={() => {
                    setInterviewFormOpen(false);
                    setSelectedCandidate(null);
                }}
                title="Lên lịch phỏng vấn"
                size="default"
            >
                <InterviewForm
                    candidate={selectedCandidate}
                    onSubmit={handleInterviewSubmit}
                    onCancel={() => {
                        setInterviewFormOpen(false);
                        setSelectedCandidate(null);
                    }}
                />
            </Modal>
        </div>
    );
};

// Simple Interview Form Component
const InterviewForm = ({ candidate, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        thoiGian: '',
        diaDiem: '',
        ghiChu: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <p>
                    <strong>Ứng viên:</strong>{' '}
                    {candidate?.ungVien?.hoTen || candidate?.name || '—'}
                </p>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Thời gian *
                </label>
                <input
                    type="datetime-local"
                    value={formData.thoiGian}
                    onChange={(e) =>
                        setFormData({ ...formData, thoiGian: e.target.value })
                    }
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Địa điểm *
                </label>
                <input
                    type="text"
                    value={formData.diaDiem}
                    onChange={(e) =>
                        setFormData({ ...formData, diaDiem: e.target.value })
                    }
                    placeholder="VD: Phòng họp tầng 3 hoặc Google Meet"
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Ghi chú
                </label>
                <textarea
                    value={formData.ghiChu}
                    onChange={(e) =>
                        setFormData({ ...formData, ghiChu: e.target.value })
                    }
                    rows="3"
                    placeholder="Thông tin thêm về buổi phỏng vấn..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontFamily: 'inherit'
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        cursor: 'pointer'
                    }}
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#14b8a6',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Lên lịch
                </button>
            </div>
        </form>
    );
};

export default RecruiterDashboard;