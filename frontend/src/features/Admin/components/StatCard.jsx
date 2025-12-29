// src/features/Admin/components/StatCard.jsx
import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ icon: Icon, label, value, trend, color }) => {
    return (
        <div className='stat-card'>
            <div className='stat-header'>
                <div className={`stat-icon ${color}`}>
                    <Icon size={24} />
                </div>
            </div>
            <div className='stat-value'>{value.toLocaleString()}</div>
            <div className='stat-label'>{label}</div>
            {trend && (
                <div className={`stat-trend ${trend.direction}`}>
                    ↑ {trend.value}
                </div>
            )}
        </div>
    );
};

export default StatCard;
