import React, { useEffect, useState } from 'react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';
import { handleApiError } from '@utils/apiErrorHandler';
import authService from '@services/authService';

const AdminSettingsModal = ({ open, onClose }) => {
    const [settings, setSettings] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;
        const load = async () => {
            try {
                const res = await api.get('/admin/settings');
                if (res && res.data) setSettings(res.data);
                else if (res && res.data === undefined) setSettings(res);
            } catch (err) {
                console.error('Load settings error', err);
            }
        };
        load();
    }, [open]);

    if (!open) return null;

    const handleChange = (k, v) => setSettings({ ...settings, [k]: v });

    const { toast } = useToast();
    const currentUser = authService.getCurrentUser();
    const isAdmin = currentUser?.vaiTro === 'quan_tri_he_thong';

    const [addingKey, setAddingKey] = useState(false);
    const [newKey, setNewKey] = useState('');

    const handleAddKey = () => {
        setAddingKey(true);
        setNewKey('');
    };

    const handleConfirmAddKey = () => {
        if (!newKey) return toast.warning('Vui lòng nhập key');
        handleChange(newKey, '');
        setAddingKey(false);
        setNewKey('');
    };

    const handleSave = async () => {
        if (!isAdmin) {
            return toast.error('Bạn không có quyền thay đổi cấu hình hệ thống');
        }
        setSaving(true);
        try {
            await api.put('/admin/settings', settings);
            toast.success('Lưu cấu hình thành công');
            onClose && onClose();
        } catch (err) {
            console.error('Save settings error', err);
            handleApiError(toast, err, 'Lỗi khi lưu settings');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='modal-backdrop'>
            <div className='modal-dialog'>
                <div className='modal-header'>
                    <h3>Cài đặt hệ thống</h3>
                    <button onClick={onClose} className='btn-close'>
                        ×
                    </button>
                </div>
                <div className='modal-body'>
                    <div style={{ marginBottom: 12 }}>
                        {!addingKey ? (
                            <button onClick={handleAddKey} className='btn'>
                                Thêm key
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input
                                    placeholder='Key setting'
                                    value={newKey}
                                    onChange={(e) => setNewKey(e.target.value)}
                                />
                                <button
                                    className='btn'
                                    onClick={handleConfirmAddKey}
                                >
                                    Thêm
                                </button>
                                <button
                                    className='btn'
                                    onClick={() => {
                                        setAddingKey(false);
                                        setNewKey('');
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        )}
                    </div>
                    {Object.keys(settings).length === 0 && (
                        <div>Không có cấu hình nào</div>
                    )}
                    {Object.entries(settings).map(([k, v]) => (
                        <div key={k} style={{ marginBottom: 8 }}>
                            <label style={{ fontSize: 12 }}>{k}</label>
                            <input
                                value={v}
                                onChange={(e) =>
                                    handleChange(k, e.target.value)
                                }
                            />
                        </div>
                    ))}
                    <div className='modal-actions'>
                        <button className='btn' onClick={onClose}>
                            Hủy
                        </button>
                        <button
                            className='btn btn-primary'
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsModal;
