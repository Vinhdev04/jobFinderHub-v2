// ==================== hooks/useApplications.js ====================
import { useState, useEffect } from 'react';
import api from '@services/api';

export const useApplications = (statusFilter = 'all') => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, [statusFilter]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            // Get current user to know student id
            const me = await api.get('/auth/me');
            // backend returns { success: true, user }
            const studentId = me?.user?._id || me?.user?.id;
            if (!studentId) {
                setApplications([]);
                return;
            }

            // include status filter if provided
            const query = statusFilter && statusFilter !== 'all' ? `?trangThai=${encodeURIComponent(statusFilter)}` : '';
            const res = await api.get(`/applications/candidate/${studentId}${query}`);
            if (res && res.success && Array.isArray(res.data)) {
                // Normalize fields expected by StudentDashboard
                const apps = res.data.map((a) => ({
                    id: a._id || a.id,
                    company: a.tinTuyenDung?.congTy?.tenCongTy || a.tinTuyenDung?.congTy || 'Công ty',
                    position: a.tinTuyenDung?.tieuDe || a.tinTuyenDung?.viTri || 'Vị trí',
                    logo: a.tinTuyenDung?.congTy?.logo || null,
                    submittedDate: a.ngayNop || a.createdAt || '',
                    interviewDate: a.lichPhongVan?.[0]?.ngay || a.lichPhongVan || null,
                    status: a.trangThai || a.status || 'pending'
                }));
                setApplications(apps);
            } else {
                setApplications([]);
            }
        } catch (err) {
            console.error('Failed to fetch applications:', err);
            setError(err?.message || 'Không tải được đơn ứng tuyển');
        } finally {
            setLoading(false);
        }
    };

    const withdrawApplication = async (id) => {
        try {
            await api.delete(`/applications/${id}`);
            setApplications((prev) => prev.filter((app) => app.id !== id));
        } catch (err) {
            console.error('Failed to withdraw:', err);
        }
    };

    return {
        applications,
        loading,
        error,
        withdrawApplication,
        refetch: fetchApplications
    };
};

