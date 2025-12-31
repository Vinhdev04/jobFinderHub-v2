import React, { useState, useEffect } from 'react';
import Modal from '@components/common/Modal/Modal';
import userService from '@services/userService';
import { useToast } from '@hooks/useToast';
import styles from './UserForm.module.css';

const defaultForm = {
    hoVaTen: '',
    email: '',
    soDienThoai: '',
    vaiTro: 'sinh_vien',
    trangThai: 'hoat_dong',
    matKhau: '',
    sendWelcome: true
};

const UserForm = ({ isOpen, onClose, onSaved, initialData = null }) => {
    const [form, setForm] = useState(defaultForm);
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (initialData) {
            setForm({
                hoVaTen: initialData.hoVaTen || '',
                email: initialData.email || '',
                soDienThoai: initialData.soDienThoai || '',
                vaiTro: initialData.vaiTro || 'sinh_vien',
                trangThai: initialData.trangThai || 'hoat_dong',
                matKhau: '',
                sendWelcome: true
            });
        } else {
            setForm(defaultForm);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (initialData) {
                const payload = { ...form };
                // Do not send empty password when editing
                if (!payload.matKhau) delete payload.matKhau;
                // Remove sendWelcome when editing
                delete payload.sendWelcome;
                const res = await userService.updateUser(
                    initialData._id,
                    payload
                );
                toast.success(res.message || 'Cập nhật thành công');
            } else {
                // Create
                const payload = { ...form };
                const res = await userService.createUser(payload);
                toast.success(res.message || 'Tạo người dùng thành công');
            }

            onSaved && onSaved();
            onClose();
        } catch (err) {
            console.error('UserForm error', err);
            toast.error(err.message || 'Lỗi khi lưu người dùng');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
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
                        value={form.email}
                        onChange={handleChange}
                        required
                        type='email'
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
                    <label>Vai trò</label>
                    <select
                        name='vaiTro'
                        value={form.vaiTro}
                        onChange={handleChange}
                    >
                        <option value='sinh_vien'>Sinh viên</option>
                        <option value='giao_vu'>Giáo vụ</option>
                        <option value='nhan_vien_tuyen_dung'>
                            NV Tuyển dụng
                        </option>
                        <option value='quan_ly_doanh_nghiep'>Quản lý DN</option>
                        <option value='quan_tri_he_thong'>Quản trị viên</option>
                    </select>
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
                        <option value='khoa'>Khóa</option>
                    </select>
                </div>

                {!initialData && (
                    <>
                        <div className={styles.formGroup}>
                            <label>Mật khẩu (tạm thời)</label>
                            <input
                                name='matKhau'
                                value={form.matKhau}
                                onChange={handleChange}
                                type='password'
                            />
                            <span className={styles.helperText}>
                                Để trống để hệ thống tự tạo mật khẩu ngẫu nhiên
                            </span>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input
                                type='checkbox'
                                name='sendWelcome'
                                id='sendWelcome'
                                checked={form.sendWelcome === true}
                                onChange={(e) =>
                                    setForm((s) => ({
                                        ...s,
                                        sendWelcome: e.target.checked
                                    }))
                                }
                            />
                            <label htmlFor='sendWelcome'>
                                <span>
                                    Gửi email chào mừng kèm mật khẩu tạm thời
                                </span>
                            </label>
                        </div>
                    </>
                )}

                <div className={styles.formActions}>
                    <button
                        type='button'
                        className={`${styles.btn} ${styles.btnSecondary}`}
                        onClick={onClose}
                        disabled={submitting}
                    >
                        Hủy
                    </button>
                    <button
                        type='submit'
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        disabled={submitting}
                    >
                        {submitting ? 'Đang lưu...' : 'Lưu'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UserForm;
