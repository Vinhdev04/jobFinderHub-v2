// src/features/Admin/components/QuickActionsCard.jsx
import React from 'react';
import { Users, Database, Settings } from 'lucide-react';
import '../styles/QuickActionsCard.css';

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

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Thao tác nhanh</h3>
            </div>
            <div className='quick-actions'>
                {actions.map((action, index) => (
                    <div key={index} className='quick-action'>
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
        </div>
    );
};

export default QuickActionsCard;
