// ==================== NotificationItem.jsx ====================
import React from 'react';
import '../styles/NotificationItem.css';

const NotificationItem = ({ icon, title, message, time, isRead, onClick }) => {
    return (
        <div
            className={`notification-item ${
                !isRead ? 'notification-item--unread' : ''
            }`}
            onClick={onClick}
        >
            <div className='notification-item__icon'>{icon}</div>
            <div className='notification-item__content'>
                <h4 className='notification-item__title'>{title}</h4>
                {message && (
                    <p className='notification-item__message'>{message}</p>
                )}
                <span className='notification-item__time'>{time}</span>
            </div>
        </div>
    );
};

export default NotificationItem;
