import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ icon, count, label, color = 'primary' }) => {
    return (
        <div className='stat-card'>
            <div className={`stat-card__icon stat-card__icon--${color}`}>
                <span className='stat-card__icon-emoji'>{icon}</span>
            </div>
            <div className='stat-card__content'>
                <h3 className='stat-card__count'>{count}</h3>
                <p className='stat-card__label'>{label}</p>
            </div>
        </div>
    );
};

export default StatCard;
