import React, { useEffect, useState } from 'react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';
import Modal from '@components/common/Modal/Modal';
import styles from './UserForm.module.css';
import { handleApiError } from '@utils/apiErrorHandler';
import authService from '@services/authService';

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

    const { toast } = useToast();
    const currentUser = authService.getCurrentUser();
    const isAdmin = currentUser?.vaiTro === 'quan_tri_he_thong';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAdmin) {
            toast.error('Bạn không có quyền thực hiện hành động này');
            return;
        }
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
            handleApiError(toast, err, 'Lỗi khi lưu giáo viên');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={mode === 'create' ? 'Thêm giáo viên' : 'Chỉnh sửa giáo viên'}
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
                    <label>Mã giáo viên</label>
                    <input
                        name='maGiaoVien'
                        value={form.maGiaoVien}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Bộ môn</label>
                    <input
                        name='boMon'
                        value={form.boMon}
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

export default TeacherModal;
