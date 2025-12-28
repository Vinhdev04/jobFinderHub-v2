// src/components/Dashboard/UserCard.jsx
import React from 'react';

const UserCard = ({ user, onViewDetails, onEdit, onLock }) => {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className='admin-system__user-card'>
            <div className='admin-system__user-avatar'>
                {getInitials(user.name)}
            </div>

            <div className='admin-system__user-info'>
                <h4 className='admin-system__user-name'>{user.name}</h4>
                <p className='admin-system__user-email'>{user.email}</p>
                <div className='admin-system__user-meta'>
                    <span className='admin-system__user-role'>{user.role}</span>
                    <span
                        className={`admin-system__user-status admin-system__user-status--${user.status}`}
                    >
                        {user.status === 'active'
                            ? 'Hoạt động'
                            : 'Không hoạt động'}
                    </span>
                </div>
            </div>

            <div className='admin-system__user-actions'>
                <div className='admin-system__user-date'>
                    <div className='admin-system__user-date-label'>
                        Ngày tham gia
                    </div>
                    <div className='admin-system__user-date-value'>
                        {user.joinDate}
                    </div>
                </div>
                <div className='admin-system__user-date'>
                    <div className='admin-system__user-date-label'>
                        Hoạt động gần nhất
                    </div>
                    <div className='admin-system__user-date-value'>
                        {user.lastActive}
                    </div>
                </div>
            </div>

            <button className='admin-system__user-menu'>⋮</button>

            <div className='admin-system__user-buttons'>
                <button
                    className='admin-system__action-btn admin-system__action-btn--primary'
                    onClick={() => onViewDetails(user)}
                >
                    Xem chi tiết
                </button>
                <button
                    className='admin-system__action-btn admin-system__action-btn--secondary'
                    onClick={() => onEdit(user)}
                >
                    Chỉnh sửa
                </button>
                <button
                    className='admin-system__action-btn admin-system__action-btn--danger'
                    onClick={() => onLock(user)}
                >
                    Khóa tài khoản
                </button>
            </div>
        </div>
    );
};

export default UserCard;
