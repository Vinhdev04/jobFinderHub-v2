// src/features/Admin/components/ActivityLogCard.jsx
import React from 'react';
import { Download, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../constants/systemConstants.js';
import '../styles/ActivityLogCard.css';

const ActivityLogCard = () => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            default:
                return <CheckCircle size={20} />;
        }
    };

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Hoạt động gần đây</h3>
                <button className='card-action'>
                    <Download size={16} />
                    Xuất log
                </button>
            </div>
            <div className='activity-list'>
                {MOCK_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className='activity-item'>
                        <div className={`activity-icon ${activity.status}`}>
                            {getStatusIcon(activity.status)}
                        </div>
                        <div className='activity-details'>
                            <div className='activity-action'>
                                {activity.action}
                            </div>
                            <div className='activity-meta'>
                                {activity.user} • IP: {activity.ip}
                            </div>
                        </div>
                        <div className='activity-time'>{activity.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLogCard;
