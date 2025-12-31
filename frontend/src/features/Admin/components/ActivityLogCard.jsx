// src/features/Admin/components/ActivityLogCard.jsx
import React, { useEffect, useState } from 'react';
import {
    Download,
    CheckCircle,
    XCircle,
    AlertTriangle,
    RefreshCw
} from 'lucide-react';
import api from '@services/api';
import { useToast } from '@hooks/useToast';
import '../styles/ActivityLogCard.css';

const ActivityLogCard = () => {
    const toast = useToast();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

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

    const load = async () => {
        setLoading(true);
        setError(null);
        setDebugInfo(null);

        try {
            console.log('🔍 [ActivityLog] Đang gọi API /activities...');
            const startTime = Date.now();

            const res = await api.get('/activities?limit=10&page=1');
            const endTime = Date.now();

            console.log('✅ [ActivityLog] Response nhận được:', res);
            console.log(`⏱️ [ActivityLog] Thời gian: ${endTime - startTime}ms`);

            // Debug info
            const debug = {
                status: res.status,
                responseTime: `${endTime - startTime}ms`,
                dataStructure: res.data ? Object.keys(res.data) : [],
                activitiesCount: res.data?.activities?.length || 0,
                hasData: !!res.data,
                token: localStorage.getItem('token') ? 'Có' : 'Không'
            };

            setDebugInfo(debug);
            console.log('📊 [ActivityLog] Debug Info:', debug);

            if (res && res.data) {
                const acts = res.data.activities || res.data.data || [];
                console.log(
                    `📋 [ActivityLog] Số lượng activities: ${acts.length}`
                );
                console.log('📝 [ActivityLog] Activities:', acts);
                setActivities(acts);

                if (acts.length === 0) {
                    console.warn('⚠️ [ActivityLog] Không có activities nào!');
                }
            } else {
                console.warn('⚠️ [ActivityLog] Response không có data');
                setActivities([]);
            }
        } catch (err) {
            console.error('❌ [ActivityLog] Load activities error:', err);
            console.error(
                '❌ [ActivityLog] Error response:',
                err.response?.data
            );
            console.error(
                '❌ [ActivityLog] Error status:',
                err.response?.status
            );

            setError({
                message: err.message,
                status: err.response?.status,
                data: err.response?.data
            });

            setActivities([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleExport = () => {
        console.log('📥 [ActivityLog] Xuất log...');
        const base = (
            import.meta.env.VITE_API_URL || 'http://localhost:5000'
        ).replace(/\/+$/, '');
        const url = `${base}/api/activities/export`;
        const token = localStorage.getItem('token');
        const withToken = token
            ? `${url}?token=${encodeURIComponent(token)}`
            : url;

        console.log('🔗 [ActivityLog] Export URL:', withToken);
        window.open(withToken, '_blank');
    };

    const handleRefresh = () => {
        console.log('🔄 [ActivityLog] Làm mới...');
        load();
    };

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Hoạt động gần đây</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className='card-action'
                        onClick={handleRefresh}
                        title='Làm mới'
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button
                        className='card-action'
                        onClick={handleExport}
                        title='Xuất log'
                    >
                        <Download size={16} />
                        Xuất log
                    </button>
                </div>
            </div>

            {/* Debug Panel - Chỉ hiện trong development */}
            {import.meta.env.DEV && debugInfo && (
                <div
                    style={{
                        padding: '1rem',
                        margin: '1rem',
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                    }}
                >
                    <strong>🔧 Debug Info:</strong>
                    <pre
                        style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem' }}
                    >
                        {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                </div>
            )}

            {/* Error Panel */}
            {error && (
                <div
                    style={{
                        padding: '1rem',
                        margin: '1rem',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#991b1b'
                    }}
                >
                    <strong>❌ Lỗi:</strong> {error.message}
                    {error.status && <div>Status: {error.status}</div>}
                    {error.data && (
                        <pre
                            style={{
                                margin: '0.5rem 0 0 0',
                                fontSize: '0.75rem'
                            }}
                        >
                            {JSON.stringify(error.data, null, 2)}
                        </pre>
                    )}
                </div>
            )}

            <div className='activity-list'>
                {loading ? (
                    <div className='activity-loading'>Đang tải...</div>
                ) : activities.length === 0 ? (
                    <div
                        style={{
                            padding: '2rem',
                            textAlign: 'center',
                            color: '#6b7280'
                        }}
                    >
                        <p>Chưa có hoạt động nào được ghi lại.</p>
                        <p
                            style={{
                                fontSize: '0.875rem',
                                marginTop: '0.5rem'
                            }}
                        >
                            Kiểm tra:
                        </p>
                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                fontSize: '0.875rem',
                                marginTop: '0.5rem'
                            }}
                        >
                            <li>✓ Backend có middleware logging không?</li>
                            <li>
                                ✓ Database có collection "activities" không?
                            </li>
                            <li>
                                ✓ API endpoint /activities có hoạt động không?
                            </li>
                        </ul>
                    </div>
                ) : (
                    activities.map((activity) => (
                        <div key={activity._id} className='activity-item'>
                            <div
                                className={`activity-icon ${
                                    activity.status || 'success'
                                }`}
                            >
                                {getStatusIcon(activity.status)}
                            </div>
                            <div className='activity-details'>
                                <div className='activity-action'>
                                    {activity.action ||
                                        activity.description ||
                                        'N/A'}
                                </div>
                                <div className='activity-meta'>
                                    {activity.userEmail ||
                                        activity.user?.email ||
                                        'Unknown'}{' '}
                                    • IP: {activity.ip || '-'} •
                                    {activity.method} {activity.path}
                                </div>
                            </div>
                            <div className='activity-time'>
                                {activity.createdAt
                                    ? new Date(
                                          activity.createdAt
                                      ).toLocaleString('vi-VN')
                                    : '-'}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Test Button - Chỉ hiện trong development */}
            {import.meta.env.DEV && (
                <div
                    style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}
                >
                    <button
                        onClick={() => {
                            console.log('🧪 Testing API manually...');
                            fetch(
                                `${
                                    import.meta.env.VITE_API_URL ||
                                    'http://localhost:5000'
                                }/api/activities?limit=10&page=1`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem(
                                            'token'
                                        )}`
                                    }
                                }
                            )
                                .then((r) => r.json())
                                .then((d) => {
                                    console.log('✅ Manual test success:', d);
                                    toast.toast.success(
                                        'Kiểm tra xong — xem console'
                                    );
                                })
                                .catch((e) => {
                                    console.error('❌ Manual test failed:', e);
                                    toast.toast.error(
                                        'Kiểm tra thất bại — xem console'
                                    );
                                });
                        }}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}
                    >
                        🧪 Test API Manually
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActivityLogCard;
