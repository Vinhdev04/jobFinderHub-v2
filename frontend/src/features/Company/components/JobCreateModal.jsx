import React, { useState, useEffect } from 'react';
import api from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { useToast } from '@hooks/useToast';
import { handleApiError } from '@utils/apiErrorHandler';
import authService from '@services/authService';

const JobCreateModal = ({
    open,
    onClose,
    onCreated,
    initialData,
    onUpdated
}) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const currentUser = authService.getCurrentUser();
    const isRecruiter =
        currentUser?.vaiTro === 'nhan_vien_tuyen_dung' ||
        currentUser?.vaiTro === 'quan_tri_he_thong';
    const [form, setForm] = useState({
        tieuDe: '',
        viTri: '',
        moTaCongViec: '',
        loaiCongViec: '',
        mucLuong: '',
        diaDiem: '',
        soLuongTuyen: 1,
        hanNopHoSo: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm({
                tieuDe: initialData.tieuDe || initialData.title || '',
                viTri: initialData.viTri || initialData.position || '',
                moTaCongViec:
                    initialData.moTaCongViec || initialData.description || '',
                loaiCongViec: initialData.loaiCongViec || '',
                mucLuong: initialData.mucLuong || initialData.salary || '',
                diaDiem: initialData.diaDiem || initialData.location || '',
                soLuongTuyen:
                    initialData.soLuongTuyen || initialData.vacancy || 1,
                hanNopHoSo: initialData.hanNopHoSo || ''
            });
        } else {
            setForm({
                tieuDe: '',
                viTri: '',
                moTaCongViec: '',
                loaiCongViec: '',
                mucLuong: '',
                diaDiem: '',
                soLuongTuyen: 1,
                hanNopHoSo: ''
            });
        }
    }, [initialData, open]);

    if (!open) return null;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...form,
                congTy: user?.congTy?._id || user?.congTy
            };

            if (!isRecruiter) {
                return toast.error('Bạn không có quyền tạo/sửa tin tuyển dụng');
            }
            if (initialData && (initialData._id || initialData.id)) {
                // update
                const id = initialData._id || initialData.id;
                const res = await api.put(`/jobs/${id}`, payload);
                toast.success('Cập nhật tin tuyển dụng thành công');
                onUpdated && onUpdated(res && res.data ? res.data : res);
            } else {
                // create
                const res = await api.post('/jobs', payload);
                toast.success('Tạo tin tuyển dụng thành công');
                onCreated && onCreated(res && res.data ? res.data : res);
            }
            onClose && onClose();
        } catch (err) {
            console.error('Create/Update job error', err);
            handleApiError(toast, err, 'Lỗi khi lưu tin tuyển dụng');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>
                        {initialData
                            ? 'Chỉnh sửa tin tuyển dụng'
                            : 'Tạo tin tuyển dụng'}
                    </h3>
                    <button onClick={onClose}>×</button>
                </div>
                <form className='modal-body' onSubmit={handleSubmit}>
                    <label>
                        Tiêu đề
                        <input
                            name='tieuDe'
                            value={form.tieuDe}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Vị trí
                        <input
                            name='viTri'
                            value={form.viTri}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Mô tả
                        <textarea
                            name='moTaCongViec'
                            value={form.moTaCongViec}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Loại công việc
                        <input
                            name='loaiCongViec'
                            value={form.loaiCongViec}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Mức lương
                        <input
                            name='mucLuong'
                            value={form.mucLuong}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Địa điểm
                        <input
                            name='diaDiem'
                            value={form.diaDiem}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Số lượng tuyển
                        <input
                            name='soLuongTuyen'
                            type='number'
                            value={form.soLuongTuyen}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Hạn nộp hồ sơ
                        <input
                            name='hanNopHoSo'
                            type='date'
                            value={form.hanNopHoSo}
                            onChange={handleChange}
                        />
                    </label>
                    <div className='modal-actions'>
                        <button type='button' className='btn' onClick={onClose}>
                            Hủy
                        </button>
                        <button
                            type='submit'
                            className='btn btn-primary'
                            disabled={saving}
                        >
                            {saving
                                ? 'Đang lưu...'
                                : initialData
                                ? 'Cập nhật'
                                : 'Tạo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobCreateModal;
