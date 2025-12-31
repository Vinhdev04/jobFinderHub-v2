import React, { useEffect, useState } from 'react';
import api from '@services/api';

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

    const handleAddKey = () => {
        const key = window.prompt('Key setting');
        if (!key) return;
        handleChange(key, '');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/admin/settings', settings);
            alert('Lưu cấu hình thành công');
            onClose && onClose();
        } catch (err) {
            console.error('Save settings error', err);
            alert(err && err.message ? err.message : 'Lỗi khi lưu settings');
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
                        <button onClick={handleAddKey} className='btn'>
                            Thêm key
                        </button>
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
