// src/features/Admin/components/QuickActionsCard.jsx
import React, { useState } from 'react';
import { Users, Database, Settings } from 'lucide-react';
import api from '@services/api';
import AdminSettingsModal from './AdminSettingsModal';
import UserForm from './UserForm';
import '../styles/QuickActionsCard.css';
import { useToast } from '@hooks/useToast';

const QuickActionsCard = () => {
    const actions = [
        {
            icon: Users,
            title: 'Tạo tài khoản',
            description: 'Thêm người dùng mới',
            color: 'teal'
        },
        {
            icon: Database,
            title: 'Sao lưu dữ liệu',
            description: 'Backup hệ thống',
            color: 'blue'
        },
        {
            icon: Settings,
            title: 'Cấu hình',
            description: 'Cài đặt hệ thống',
            color: 'orange'
        }
    ];

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [userModalOpen, setUserModalOpen] = useState(false);

    const toast = useToast();

    const handleBackup = async () => {
        try {
            const res = await api.get('/admin/backup');
            if (res && res.downloadUrl) {
                const base = (
                    import.meta.env.VITE_API_URL || 'http://localhost:5000'
                ).replace(/\/+$/, '');
                window.open(base + res.downloadUrl, '_blank');
            } else if (res && res.data && res.data.downloadUrl) {
                const base = (
                    import.meta.env.VITE_API_URL || 'http://localhost:5000'
                ).replace(/\/+$/, '');
                window.open(base + res.data.downloadUrl, '_blank');
            } else {
                toast.toast.error('Không thể tạo backup');
            }
        } catch (err) {
            console.error('Backup error', err);
            toast.toast.error(
                err && err.message ? err.message : 'Lỗi khi sao lưu'
            );
        }
    };

    const handleConfig = () => setSettingsOpen(true);

    const handleCreateUser = () => setUserModalOpen(true);

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Thao tác nhanh</h3>
            </div>
            <div className='quick-actions'>
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className='quick-action'
                        onClick={
                            action.title === 'Sao lưu dữ liệu'
                                ? handleBackup
                                : action.title === 'Cấu hình'
                                ? handleConfig
                                : action.title === 'Tạo tài khoản'
                                ? handleCreateUser
                                : undefined
                        }
                    >
                        <div className={`quick-action-icon ${action.color}`}>
                            <action.icon size={24} />
                        </div>
                        <div className='quick-action-text'>
                            <h4>{action.title}</h4>
                            <p>{action.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {settingsOpen && (
                <AdminSettingsModal
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                />
            )}
            {userModalOpen && (
                <UserForm
                    isOpen={userModalOpen}
                    onClose={() => setUserModalOpen(false)}
                    onSaved={() => {
                        setUserModalOpen(false);
                        toast.toast.success('Người dùng đã được tạo');
                    }}
                />
            )}
        </div>
    );
};

export default QuickActionsCard;
