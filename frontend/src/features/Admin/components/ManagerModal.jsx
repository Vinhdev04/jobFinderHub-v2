import React, { useEffect, useState } from 'react';
import Modal from '@components/common/Modal/Modal';
import api from '@services/api';
import { useToast } from '@hooks/useToast.jsx';
import styles from './UserForm.module.css';

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

    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (mode === 'create') await api.post('/managers', form);
            else await api.put(`/managers/${manager._id}`, form);
            if (onSaved) onSaved();
        } catch (err) {
            console.error('Save manager error', err);
            // useToast returns { toast } with helpers
            try {
                toast?.toast?.error
                    ? toast.toast.error(err.message || 'Lỗi khi lưu nhân sự')
                    : toast?.error?.(err.message || 'Lỗi khi lưu nhân sự');
            } catch (e) {
                console.error('Toast error', e);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={mode === 'create' ? 'Thêm nhân sự' : 'Chỉnh sửa nhân sự'}
        >
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label>Họ và tên</label>
                    <input
                        name='hoVaTen'
                        value={form.hoVaTen}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Số điện thoại</label>
                    <input
                        name='soDienThoai'
                        value={form.soDienThoai}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Mã nhân viên</label>
                    <input
                        name='maNhanVien'
                        value={form.maNhanVien}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Đơn vị</label>
                    <input
                        name='donVi'
                        value={form.donVi}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Chức vụ</label>
                    <input
                        name='chucVu'
                        value={form.chucVu}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Trạng thái</label>
                    <select
                        name='trangThai'
                        value={form.trangThai}
                        onChange={handleChange}
                    >
                        <option value='hoat_dong'>Hoạt động</option>
                        <option value='tam_khoa'>Tạm khóa</option>
                        <option value='nghi_viec'>Nghỉ việc</option>
                    </select>
                </div>

                <div className={styles.formActions}>
                    <button
                        type='button'
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={onClose}
                        disabled={saving}
                    >
                        Hủy
                    </button>
                    <button
                        type='submit'
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        disabled={saving}
                    >
                        {saving ? 'Đang lưu...' : 'Lưu'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ManagerModal;
