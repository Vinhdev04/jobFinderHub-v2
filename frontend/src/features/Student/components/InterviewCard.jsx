import React from 'react';
import '../styles/InterviewCard.css';

const InterviewCard = ({
    company,
    position,
    date,
    time,
    location,
    interviewer,
    type,
    status,
    onJoin,
    onViewDetails
}) => {
    const isOnline = type === 'online';

    return (
        <div className={`interview-card interview-card--${status}`}>
            <div className='interview-card__header'>
                <div className='interview-card__title'>
                    <h3 className='interview-card__position'>{position}</h3>
                    <p className='interview-card__company'>{company}</p>
                </div>
                <span
                    className={`interview-card__badge interview-card__badge--${status}`}
                >
                    {status === 'online' ? 'Online' : 'Offline'}
                </span>
            </div>

            <div className='interview-card__info'>
                <div className='interview-card__info-item'>
                    <span className='interview-card__icon'>📅</span>
                    <span className='interview-card__text'>{date}</span>
                </div>
                <div className='interview-card__info-item'>
                    <span className='interview-card__icon'>🕒</span>
                    <span className='interview-card__text'>{time}</span>
                </div>
                <div className='interview-card__info-item'>
                    <span className='interview-card__icon'>
                        {isOnline ? '💻' : '📍'}
                    </span>
                    <span className='interview-card__text'>{location}</span>
                </div>
                {interviewer && (
                    <div className='interview-card__info-item'>
                        <span className='interview-card__icon'>👤</span>
                        <span className='interview-card__text'>
                            {interviewer}
                        </span>
                    </div>
                )}
            </div>

            <div className='interview-card__actions'>
                {isOnline && onJoin && (
                    <button
                        className='interview-card__btn interview-card__btn--primary'
                        onClick={onJoin}
                    >
                        Tham gia
                    </button>
                )}
                {onViewDetails && (
                    <button
                        className='interview-card__btn interview-card__btn--secondary'
                        onClick={onViewDetails}
                    >
                        Xem chi tiết
                    </button>
                )}
            </div>
        </div>
    );
};

export default InterviewCard;
