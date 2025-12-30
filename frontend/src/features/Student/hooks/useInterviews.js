// ==================== hooks/useInterviews.js ====================
import { useState, useEffect } from 'react';
import { useToast } from '@hooks/useToast.jsx';
import api from '@services/api';

export const useInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            setLoading(true);
            const me = await api.get('/auth/me');
            const studentId = me?.user?._id || me?.user?.id;
            if (!studentId) {
                setInterviews([]);
                return;
            }

            const res = await api.get(`/interviews/candidate/${studentId}`);
            if (res && res.success && Array.isArray(res.data)) {
                setInterviews(res.data.map((it) => ({
                    id: it._id || it.id,
                    company: it.tinTuyenDung?.congTy?.tenCongTy || it.tinTuyenDung?.congTy || 'Công ty',
                    position: it.tinTuyenDung?.tieuDe || it.tinTuyenDung?.viTri || 'Vị trí',
                    date: it.ngayPhongVan || it.date || '',
                    time: it.gio || it.time || '',
                    location: it.hinhThuc === 'online' ? (it.hinhThucChiTiet || 'Online') : (it.diaDiem || 'TBA'),
                    interviewer: it.nguoiPhongVan?.hoTen || it.nguoiPhongVan || '',
                    type: it.hinhThuc || (it.meetingLink ? 'online' : 'offline'),
                    meetingLink: it.meetingLink || null,
                    status: it.trangThai || 'scheduled'
                })));
            } else {
                setInterviews([]);
            }
        } catch (err) {
            console.error('Failed to fetch interviews:', err);
            setError(err?.message || 'Không tải được lịch phỏng vấn');
        } finally {
            setLoading(false);
        }
    };

    const { toast } = useToast();
    const joinInterview = (id) => {
        const interview = interviews.find((i) => i.id === id);
        if (interview?.meetingLink) {
            window.open(interview.meetingLink, '_blank');
        } else {
            toast.error('Link phỏng vấn không khả dụng');
        }
    };

    return {
        interviews,
        loading,
        error,
        joinInterview,
        refetch: fetchInterviews
    };
};
