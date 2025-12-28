import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ icon, count, label, colorType }) => (
    <div className='stat-card'>
        <div className={`stat-card__icon stat-card__icon--${colorType}`}>
            <span className='stat-card__icon-text'>{icon}</span>
        </div>
        <div className='stat-card__content'>
            <div className='stat-card__count'>{count}</div>
            <div className='stat-card__label'>{label}</div>
        </div>
    </div>
);

export default StatCard;
