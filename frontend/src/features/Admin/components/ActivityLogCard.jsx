// src/features/Admin/components/ActivityLogCard.jsx
import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import api from '@services/api';
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

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const res = await api.get('/activities?limit=10&page=1');
            if (res && res.data) {
                setActivities(res.data.activities || []);
            }
        } catch (err) {
            console.error('Load activities error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleExport = () => {
        const base = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/,'');
        const url = `${base}/api/activities/export`;
        // open in new tab to trigger download (Authorization header via interceptor won't be sent),
        // so include token as query param (short-lived, local use only)
        const token = localStorage.getItem('token');
        const withToken = token ? `${url}?token=${encodeURIComponent(token)}` : url;
        window.open(withToken, '_blank');
    };

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Hoạt động gần đây</h3>
                <button className='card-action' onClick={handleExport}>
                    <Download size={16} />
                    Xuất log
                </button>
            </div>
            <div className='activity-list'>
                {loading ? (
                    <div className='activity-loading'>Đang tải...</div>
                ) : (
                    activities.map((activity) => (
                        <div key={activity._id} className='activity-item'>
                            <div className={`activity-icon ${activity.status}`}>
                                {getStatusIcon(activity.status)}
                            </div>
                            <div className='activity-details'>
                                <div className='activity-action'>{activity.action}</div>
                                <div className='activity-meta'>
                                    {activity.userEmail || activity.user?.email} • IP: {activity.ip || '-'}
                                </div>
                            </div>
                            <div className='activity-time'>{new Date(activity.createdAt).toLocaleTimeString()}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityLogCard;
