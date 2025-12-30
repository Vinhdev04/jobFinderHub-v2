import React, { useState, useEffect } from 'react';
import '../styles/EditProfileModal.css';

const EditProfileModal = ({ open, onClose, profile, onSave }) => {
    const [form, setForm] = useState({
        hoVaTen: profile?.name || '',
        soDienThoai: profile?.phone || '',
        diaChi: profile?.address || ''
    });

    useEffect(() => {
        setForm({
            hoVaTen: profile?.name || '',
            soDienThoai: profile?.phone || '',
            diaChi: profile?.address || ''
        });
    }, [profile]);

    if (!open) return null;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(form);
    };

    return (
        <div className='modal-overlay'>
            <div className='modal-card'>
                <h3>Chỉnh sửa hồ sơ</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Họ và tên</label>
                        <input name='hoVaTen' value={form.hoVaTen} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Số điện thoại</label>
                        <input name='soDienThoai' value={form.soDienThoai} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Địa chỉ</label>
                        <input name='diaChi' value={form.diaChi} onChange={handleChange} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button type='submit' className='btn btn-primary'>Lưu</button>
                        <button type='button' className='btn' onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
