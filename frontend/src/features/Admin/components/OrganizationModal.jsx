import React, { useEffect, useState } from 'react';
import api from '@services/api';
import styles from './OrganizationModal.module.css';

const OrganizationModal = ({
    open,
    mode = 'create',
    org = null,
    onClose,
    onSaved
}) => {
    const [form, setForm] = useState({
        tenCongTy: '',
        moTa: '',
        diaChi: '',
        linhVuc: '',
        quyMo: '1-50',
        email: '',
        soDienThoai: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (org) {
            setForm({
                tenCongTy: org.tenCongTy || '',
                moTa: org.moTa || '',
                diaChi: org.diaChi || '',
                linhVuc: org.linhVuc || '',
                quyMo: org.quyMo || '1-50',
                email: org.email || '',
                soDienThoai: org.soDienThoai || ''
            });
        } else {
            setForm({
                tenCongTy: '',
                moTa: '',
                diaChi: '',
                linhVuc: '',
                quyMo: '1-50',
                email: '',
                soDienThoai: ''
            });
        }
    }, [org, open]);

    if (!open) return null;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'view') return onClose && onClose();
        setSaving(true);
        try {
            if (mode === 'create') {
                await api.post('/companies', form);
            } else {
                await api.put(`/companies/${org._id}`, form);
            }
            onSaved && onSaved();
            onClose && onClose();
        } catch (err) {
            console.error('Organization save error', err);
            alert(err && err.message ? err.message : 'Lỗi khi lưu tổ chức');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalDialog}>
                <div className={styles.modalHeader}>
                    <h3>
                        {mode === 'create'
                            ? 'Thêm tổ chức'
                            : mode === 'edit'
                            ? 'Sửa tổ chức'
                            : 'Xem tổ chức'}
                    </h3>
                    <button onClick={onClose} className={styles.btnClose}>
                        ×
                    </button>
                </div>
                <form
                    className={`${styles.modalBody} ${
                        mode === 'view' ? styles.viewMode : ''
                    }`}
                    onSubmit={handleSubmit}
                >
                    <label>Tên công ty</label>
                    <input
                        name='tenCongTy'
                        value={form.tenCongTy}
                        onChange={handleChange}
                        required
                        disabled={mode === 'view'}
                    />

                    <label>Mô tả</label>
                    <textarea
                        name='moTa'
                        value={form.moTa}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                    />

                    <label>Địa chỉ</label>
                    <input
                        name='diaChi'
                        value={form.diaChi}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                    />

                    <label>Lĩnh vực</label>
                    <input
                        name='linhVuc'
                        value={form.linhVuc}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                    />

                    <label>Quy mô</label>
                    <select
                        name='quyMo'
                        value={form.quyMo}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                    >
                        <option>1-50</option>
                        <option>51-200</option>
                        <option>201-500</option>
                        <option>501-1000</option>
                        <option>1000+</option>
                    </select>

                    <label>Email</label>
                    <input
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                    />

                    <label>Số điện thoại</label>
                    <input
                        name='soDienThoai'
                        value={form.soDienThoai}
                        onChange={handleChange}
                        disabled={mode === 'view'}
                    />

                    <div className={styles.modalActions}>
                        <button
                            type='button'
                            onClick={onClose}
                            className={styles.btn}
                        >
                            Hủy
                        </button>
                        {mode !== 'view' && (
                            <button
                                type='submit'
                                className={`${styles.btn} ${styles.btnPrimary}`}
                                disabled={saving}
                            >
                                {saving ? 'Đang lưu...' : 'Lưu'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrganizationModal;
