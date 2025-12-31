import { useState, useEffect, useCallback } from 'react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';

export const useRecruiterData = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [stats, setStats] = useState({});
    const { toast } = useToast();

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/jobs?limit=50&page=1');
            const list =
                res && (res.data || res.jobs || res)
                    ? res.data || res.jobs || res
                    : [];
            setJobs(Array.isArray(list) ? list : []);
        } catch (err) {
            console.warn('fetchJobs failed, using empty list', err.message);
            toast?.error('Không thể tải danh sách việc làm');
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const addJob = async (jobData) => {
        try {
            const res = await api.post('/jobs', jobData);
            const created = res && (res.data || res) ? res.data || res : null;
            if (created) setJobs((prev) => [created, ...prev]);
            return created;
        } catch (err) {
            toast?.error('Không thể tạo tin tuyển dụng');
            throw err;
        }
    };

    const updateJob = async (id, updates) => {
        try {
            const res = await api.put(`/jobs/${id}`, updates);
            const updated = res && (res.data || res) ? res.data || res : null;
            if (updated)
                setJobs((prev) =>
                    prev.map((j) => (j._id === id || j.id === id ? updated : j))
                );
            return updated;
        } catch (err) {
            toast?.error('Không thể cập nhật tin tuyển dụng');
            throw err;
        }
    };

    const deleteJob = async (id) => {
        try {
            await api.delete(`/jobs/${id}`);
            setJobs((prev) =>
                prev.filter((j) => !(j._id === id || j.id === id))
            );
            toast?.success('Xóa tin tuyển dụng thành công');
        } catch (err) {
            toast?.error('Không thể xóa tin tuyển dụng');
            throw err;
        }
    };

    const getApplicationsByJob = async (jobId, opts = {}) => {
        try {
            const res = await api.get(`/applications/job/${jobId}`, {
                params: opts
            });
            const list = res && (res.data || res) ? res.data || res : [];
            return Array.isArray(list) ? list : list.data || [];
        } catch (err) {
            console.error('getApplicationsByJob error', err.message);
            toast?.error('Không thể tải ứng viên');
            return [];
        }
    };

    const fetchStats = async () => {
        try {
            const res = await api.get('/reports/dashboard');
            const d = res && (res.data || res) ? res.data || res : {};
            setStats(d);
        } catch (err) {
            console.warn('fetchStats fallback', err.message);
            setStats({
                totalJobs: 0,
                activeJobs: 0,
                pendingApplications: 0,
                interviews: 0
            });
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchStats();
    }, [fetchJobs]);

    return {
        loading,
        jobs,
        candidates,
        interviews,
        stats,
        addJob,
        updateJob,
        deleteJob,
        getApplicationsByJob
    };
};
