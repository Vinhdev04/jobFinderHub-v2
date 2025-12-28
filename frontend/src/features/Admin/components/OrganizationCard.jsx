// src/components/Dashboard/OrganizationCard.jsx
import React from 'react';

const OrganizationCard = ({ org, onViewDetails, onEdit, onViewUsers }) => {
    return (
        <div className='admin-system__org-card'>
            <div className='admin-system__org-header'>
                <h4 className='admin-system__org-card-title'>{org.name}</h4>
                <span
                    className={`admin-system__org-badge admin-system__org-badge--${org.status}`}
                >
                    {org.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </span>
            </div>

            <div className='admin-system__org-type-label'>
                <span
                    className={`admin-system__org-type-tag admin-system__org-type-tag--${org.type}`}
                >
                    {org.type === 'company' ? 'Doanh nghiệp' : 'Trường học'}
                </span>
            </div>

            <p className='admin-system__org-detail'>Tham gia: {org.joinDate}</p>

            <div className='admin-system__org-stats'>
                <div className='admin-system__org-stat'>
                    <div className='admin-system__org-stat-label'>
                        Người dùng
                    </div>
                    <div className='admin-system__org-stat-value'>
                        {org.userCount}
                    </div>
                </div>
                <div className='admin-system__org-stat'>
                    <div className='admin-system__org-stat-label'>
                        Hoạt động
                    </div>
                    <div className='admin-system__org-stat-value'>
                        {org.activityLevel}
                    </div>
                </div>
                <div className='admin-system__org-stat'>
                    <div className='admin-system__org-stat-label'>Đánh giá</div>
                    <div className='admin-system__org-stat-value'>
                        {org.rating} ⭐
                    </div>
                </div>
            </div>

            <div className='admin-system__org-buttons'>
                <button
                    className='admin-system__action-btn admin-system__action-btn--primary'
                    onClick={() => onViewDetails(org)}
                >
                    Xem chi tiết
                </button>
                <button
                    className='admin-system__action-btn admin-system__action-btn--secondary'
                    onClick={() => onEdit(org)}
                >
                    Chỉnh sửa
                </button>
                <button
                    className='admin-system__action-btn admin-system__action-btn--secondary'
                    onClick={() => onViewUsers(org)}
                >
                    Xem người dùng
                </button>
            </div>
        </div>
    );
};

export default OrganizationCard;
