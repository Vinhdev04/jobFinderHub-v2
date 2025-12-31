import { useState, useEffect } from 'react';
import api from '@services/api';
import { useAuth } from '@hooks/useAuth';

export const useCompanyData = () => {
    const [loading, setLoading] = useState(false);
    const [recruiters, setRecruiters] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@company.com',
            status: 'active',
            statusText: 'Hoạt động',
            jobsPosted: 12,
            candidates: 45,
            hired: 8
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@company.com',
            status: 'active',
            statusText: 'Hoạt động',
            jobsPosted: 8,
            candidates: 32,
            hired: 5
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@company.com',
            status: 'inactive',
            statusText: 'Không hoạt động',
            jobsPosted: 5,
            candidates: 18,
            hired: 2
        }
    ]);

    const [applications, setApplications] = useState([
        {
            id: 1,
            company: 'FPT Software',
            position: 'Frontend Developer',
            date: '10/01/2024',
            status: 'Chấp nhận',
            statusClass: 'accepted',
            candidates: 24
        },
        {
            id: 2,
            company: 'Viettel Digital',
            position: 'Backend Developer',
            date: '16/01/2024',
            status: 'Chờ duyệt',
            statusClass: 'pending',
            candidates: 15
        },
        {
            id: 3,
            company: 'VNG Corporation',
            position: 'Mobile Developer',
            date: '20/01/2024',
            status: 'Đang xem xét',
            statusClass: 'reviewing',
            candidates: 20
        },
        {
            id: 4,
            company: 'Tiki Corporation',
            position: 'Data Analyst',
            date: '10/01/2024',
            status: 'Từ chối',
            statusClass: 'rejected',
            candidates: 10
        }
    ]);

    const [jobs, setJobs] = useState([]);

    const [stats, setStats] = useState({
        totalRecruiters: 0,
        activeRecruiters: 0,
        totalApplications: 0,
        hiredCandidates: 0
    });

    const { user } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        try {
            // Load recruiters (users with role 'nhan_vien_tuyen_dung') and filter by company
            const resUsers = await api.get(
                '/users?role=nhan_vien_tuyen_dung&limit=100'
            );
            const allUsers =
                resUsers && resUsers.data
                    ? resUsers.data.users || resUsers.data
                    : [];
            const companyId = user?.congTy?._id || user?.congTy;
            const companyRecruiters = Array.isArray(allUsers)
                ? allUsers.filter((u) => {
                      const congTy = u.congTy && (u.congTy._id || u.congTy);
                      return String(congTy) === String(companyId);
                  })
                : [];
            setRecruiters(
                companyRecruiters.map((u) => ({
                    id: u._id || u.id,
                    name: u.hoVaTen,
                    email: u.email,
                    status: u.trangThai,
                    statusText:
                        u.trangThai === 'hoat_dong'
                            ? 'Hoạt động'
                            : 'Không hoạt động',
                    jobsPosted: u.soLuongTin || 0,
                    candidates: u.soLuongUngVien || 0,
                    hired: u.daTuyen || 0
                }))
            );

            // Load applications for this company
            const resApps = await api.get(
                `/applications?companyId=${companyId}&limit=10&page=1`
            );
            const apps = resApps && resApps.data ? resApps.data : resApps;
            setApplications(
                Array.isArray(apps) ? apps : apps && apps.data ? apps.data : []
            );

            // Load company jobs
            try {
                const resJobs = await api.get(`/jobs/company/${companyId}`);
                const jobsData =
                    resJobs && resJobs.data ? resJobs.data : resJobs;
                setJobs(
                    Array.isArray(jobsData)
                        ? jobsData
                        : jobsData && jobsData.data
                        ? jobsData.data
                        : []
                );
            } catch (err) {
                console.warn('Fetch jobs error', err);
            }

            // Basic stats
            setStats({
                totalRecruiters: companyRecruiters.length,
                activeRecruiters: companyRecruiters.filter(
                    (r) => r.trangThai === 'hoat_dong'
                ).length,
                totalApplications: Array.isArray(apps)
                    ? apps.length
                    : apps && apps.pagination
                    ? apps.pagination.total
                    : 0,
                hiredCandidates: 0
            });
        } catch (err) {
            console.error('Fetch company data error', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete recruiter by id (calls backend and updates state)
    const deleteRecruiter = async (id) => {
        try {
            // attempt backend delete
            await api.delete(`/users/${id}`);
        } catch (err) {
            // ignore backend error but log
            console.warn('Delete recruiter API error', err);
        }
        setRecruiters((prev) =>
            prev.filter((r) => String(r.id) !== String(id))
        );
    };

    const updateRecruiter = async (id, updates) => {
        try {
            const res = await api.put(`/users/${id}`, updates);
            const updatedUser = res && res.data ? res.data : res;
            setRecruiters((prev) =>
                prev.map((r) =>
                    String(r.id) === String(id) ? { ...r, ...updatedUser } : r
                )
            );
            return updatedUser;
        } catch (err) {
            console.error('Update recruiter error', err);
            throw err;
        }
    };

    // Job CRUD
    const createJob = async (payload) => {
        try {
            const res = await api.post('/jobs', payload);
            const created = res && res.data ? res.data : res;
            setJobs((prev) => [created, ...(prev || [])]);
            return created;
        } catch (err) {
            console.error('Create job error', err);
            throw err;
        }
    };

    const updateJob = async (id, payload) => {
        try {
            const res = await api.put(`/jobs/${id}`, payload);
            const updated = res && res.data ? res.data : res;
            setJobs((prev) =>
                prev.map((j) =>
                    String(j._id || j.id) === String(id) ? updated : j
                )
            );
            return updated;
        } catch (err) {
            console.error('Update job error', err);
            throw err;
        }
    };

    const deleteJob = async (id) => {
        try {
            await api.delete(`/jobs/${id}`);
        } catch (err) {
            console.warn('Delete job API error', err);
        }
        setJobs((prev) =>
            (prev || []).filter((j) => String(j._id || j.id) !== String(id))
        );
    };

    // Fetch a single application details
    const getApplication = async (id) => {
        try {
            const res = await api.get(`/applications/${id}`);
            return res && res.data ? res.data : res;
        } catch (err) {
            console.error('Get application error', err);
            throw err;
        }
    };

    // Update application status (accept/reject/etc.)
    const updateApplicationStatus = async (id, trangThai, ghiChu) => {
        try {
            const res = await api.put(`/applications/${id}/status`, {
                trangThai,
                ghiChu
            });
            const updated = res && res.data ? res.data : res;
            setApplications((prev) =>
                prev.map((a) =>
                    String(a._id || a.id) === String(id) ? updated : a
                )
            );
            return updated;
        } catch (err) {
            console.error('Update application status error', err);
            throw err;
        }
    };

    // Invite to interview -> create interview then refresh application
    const inviteToInterview = async (applicationId, payload) => {
        try {
            await api.post('/interviews', {
                donUngTuyen: applicationId,
                ...payload
            });
            // fetch updated application
            const updatedApp = await getApplication(applicationId);
            setApplications((prev) =>
                prev.map((a) =>
                    String(a._id || a.id) === String(applicationId)
                        ? updatedApp
                        : a
                )
            );
            return updatedApp;
        } catch (err) {
            console.error('Invite to interview error', err);
            throw err;
        }
    };

    const createRecruiter = async (data) => {
        try {
            // Prepare payload: role + company
            const payload = {
                ...data,
                vaiTro: 'nhan_vien_tuyen_dung'
            };
            const companyId = user?.congTy?._id || user?.congTy;
            if (companyId) payload.congTy = companyId;

            const res = await api.post('/users', payload);
            const created = res && res.data ? res.data : res;

            const newRecruiter = {
                id: created._id || created.id,
                name: created.hoVaTen || created.name,
                email: created.email,
                status: created.trangThai || 'hoat_dong',
                statusText:
                    (created.trangThai === 'hoat_dong' && 'Hoạt động') ||
                    'Hoạt động',
                jobsPosted: created.soLuongTin || 0,
                candidates: created.soLuongUngVien || 0,
                hired: created.daTuyen || 0
            };
            setRecruiters((prev) => [newRecruiter, ...(prev || [])]);
            return created;
        } catch (err) {
            console.error('Create recruiter error', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        recruiters,
        applications,
        jobs,
        stats,
        createRecruiter,
        updateRecruiter,
        deleteRecruiter,
        createJob,
        updateJob,
        deleteJob,
        getApplication,
        updateApplicationStatus,
        inviteToInterview
    };
};
