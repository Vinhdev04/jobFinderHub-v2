import React from 'react';
import '../styles/InternCard.css';

const InternCard = ({ intern }) => (
    <div className='intern-card'>
        <div className='intern-card__header'>
            <div className='intern-card__avatar'>{intern.avatar}</div>
            <div className='intern-card__info'>
                <div className='intern-card__name'>{intern.name}</div>
                <div className='intern-card__id'>{intern.id}</div>
                <div className='intern-card__company'>
                    <strong>{intern.company}</strong> - {intern.position}
                </div>
            </div>
            <button className='intern-card__status'>{intern.status}</button>
        </div>

        <div className='intern-card__progress'>
            <div className='intern-card__progress-bar'>
                <div
                    className='intern-card__progress-fill'
                    style={{ width: `${intern.progress}%` }}
                ></div>
            </div>
            <span className='intern-card__progress-text'>
                {intern.progress}%
            </span>
        </div>

        <div className='intern-card__footer'>
            <span className='intern-card__date'>
                Bắt đầu: {intern.startDate}
            </span>
        </div>
    </div>
);

export default InternCard;
