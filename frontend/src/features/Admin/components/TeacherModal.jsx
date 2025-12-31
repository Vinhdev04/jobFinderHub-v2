import React, { useEffect, useState } from 'react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';

const TeacherModal = ({
    open,
    mode = 'create',
    teacher = null,
    onClose,
    onSaved
}) => {
    const [form, setForm] = useState({
        hoVaTen: '',
        email: '',
        soDienThoai: '',
        maGiaoVien: '',
        boMon: '',
        chucVu: '',
        trangThai: 'hoat_dong'
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (teacher && mode !== 'create') {
            setForm({
                hoVaTen: teacher.hoVaTen || '',
                email: teacher.email || '',
                soDienThoai: teacher.soDienThoai || '',
                maGiaoVien: teacher.maGiaoVien || '',
                boMon: teacher.boMon || '',
                chucVu: teacher.chucVu || '',
                trangThai: teacher.trangThai || 'hoat_dong'
            });
        } else {
            setForm((f) => ({ ...f }));
        }
    }, [teacher, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (mode === 'create') {
                await api.post('/teachers', form);
            } else {
                await api.put(`/teachers/${teacher._id}`, form);
            }
            if (onSaved) onSaved();
        } catch (err) {
            console.error('Save teacher error', err);
            toast.toast.error(err.message || 'Lỗi khi lưu giáo viên');
        } finally {
            setSaving(false);
        }
    };

    if (!open) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>
                        {mode === 'create'
                            ? 'Thêm giáo viên'
                            : 'Chỉnh sửa giáo viên'}
                    </h3>
                    <button className='btn' onClick={onClose}>
                        Đóng
                    </button>
                </div>

                <form className='modal-body' onSubmit={handleSubmit}>
                    <label>
                        Họ và tên
                        <input
                            name='hoVaTen'
                            value={form.hoVaTen}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Số điện thoại
                        <input
                            name='soDienThoai'
                            value={form.soDienThoai}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Mã giáo viên
                        <input
                            name='maGiaoVien'
                            value={form.maGiaoVien}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Bộ môn
                        <input
                            name='boMon'
                            value={form.boMon}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Chức vụ
                        <input
                            name='chucVu'
                            value={form.chucVu}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Trạng thái
                        <select
                            name='trangThai'
                            value={form.trangThai}
                            onChange={handleChange}
                        >
                            <option value='hoat_dong'>Hoạt động</option>
                            <option value='tam_khoa'>Tạm khóa</option>
                            <option value='nghi_viec'>Nghỉ việc</option>
                        </select>
                    </label>

                    <div className='modal-actions'>
                        <button
                            type='submit'
                            className='btn btn-primary'
                            disabled={saving}
                        >
                            {saving ? 'Đang lưu...' : 'Lưu'}
                        </button>
                        <button
                            type='button'
                            className='btn'
                            onClick={onClose}
                            disabled={saving}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherModal;
