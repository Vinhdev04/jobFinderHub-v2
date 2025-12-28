// src/components/Dashboard/ActivityLogCard.jsx
import React from 'react';

const ActivityLogCard = ({ activities }) => {
    return (
        <div className='admin-system__card'>
            <h3 className='admin-system__card-title'>Hoạt động gần đây</h3>
            <div className='admin-system__activity-list'>
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className='admin-system__activity-item'
                    >
                        <div
                            className={`admin-system__activity-icon admin-system__activity-icon--${activity.status}`}
                        >
                            {activity.status === 'success' ? '✓' : '✗'}
                        </div>
                        <div className='admin-system__activity-details'>
                            <div className='admin-system__activity-action'>
                                {activity.action}
                            </div>
                            <div className='admin-system__activity-meta'>
                                {activity.user} • IP: {activity.ip}
                            </div>
                        </div>
                        <div className='admin-system__activity-time'>
                            {activity.time}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLogCard;
