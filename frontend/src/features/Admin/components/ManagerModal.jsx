import React, { useEffect, useState } from 'react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';

const ManagerModal = ({
    open,
    mode = 'create',
    manager = null,
    onClose,
    onSaved
}) => {
    const [form, setForm] = useState({
        hoVaTen: '',
        email: '',
        soDienThoai: '',
        maNhanVien: '',
        donVi: '',
        chucVu: '',
        trangThai: 'hoat_dong'
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (manager && mode !== 'create') {
            setForm({
                hoVaTen: manager.hoVaTen || '',
                email: manager.email || '',
                soDienThoai: manager.soDienThoai || '',
                maNhanVien: manager.maNhanVien || '',
                donVi: manager.donVi || '',
                chucVu: manager.chucVu || '',
                trangThai: manager.trangThai || 'hoat_dong'
            });
        } else {
            setForm({
                hoVaTen: '',
                email: '',
                soDienThoai: '',
                maNhanVien: '',
                donVi: '',
                chucVu: '',
                trangThai: 'hoat_dong'
            });
        }
    }, [manager, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (mode === 'create') await api.post('/managers', form);
            else await api.put(`/managers/${manager._id}`, form);
            if (onSaved) onSaved();
        } catch (err) {
            console.error('Save manager error', err);
            toast.toast.error(err.message || 'Lỗi khi lưu nhân sự');
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
                            ? 'Thêm nhân sự'
                            : 'Chỉnh sửa nhân sự'}
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
                        Mã nhân viên
                        <input
                            name='maNhanVien'
                            value={form.maNhanVien}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Đơn vị
                        <input
                            name='donVi'
                            value={form.donVi}
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

export default ManagerModal;
