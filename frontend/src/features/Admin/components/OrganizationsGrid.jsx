// src/features/Admin/components/OrganizationsGrid.jsx
import React from 'react';
import { Building2, Edit2, Users } from 'lucide-react';
import { MOCK_ORGANIZATIONS } from '../constants/systemConstants.js';
import '../styles/OrganizationsGrid.css';

const OrganizationsGrid = () => {
    return (
        <div>
            <div className='section-header'>
                <h3 className='card-title'>Quản lý tổ chức</h3>
                <button className='btn btn-primary'>
                    <Building2 size={16} />
                    Thêm tổ chức
                </button>
            </div>

            <div className='org-grid'>
                {MOCK_ORGANIZATIONS.map((org) => (
                    <div key={org.id} className='org-card'>
                        <div className='org-header'>
                            <div>
                                <h3 className='org-title'>{org.name}</h3>
                                <span className='org-type'>
                                    {org.type === 'company'
                                        ? 'Doanh nghiệp'
                                        : 'Trường học'}
                                </span>
                            </div>
                            <span className={`badge ${org.status}`}>
                                {org.status === 'active'
                                    ? 'Hoạt động'
                                    : 'Không hoạt động'}
                            </span>
                        </div>

                        <div className='org-info'>
                            <p>Tham gia: {org.joinDate}</p>
                        </div>

                        <div className='org-stats'>
                            <div className='org-stat'>
                                <div className='org-stat-value'>
                                    {org.userCount}
                                </div>
                                <div className='org-stat-label'>Người dùng</div>
                            </div>
                            <div className='org-stat'>
                                <div className='org-stat-value'>
                                    {org.activeRate}
                                </div>
                                <div className='org-stat-label'>Hoạt động</div>
                            </div>
                            <div className='org-stat'>
                                <div className='org-stat-value'>
                                    {org.rating} ⭐
                                </div>
                                <div className='org-stat-label'>Đánh giá</div>
                            </div>
                        </div>

                        <div className='org-actions'>
                            <button className='btn btn-secondary'>
                                <Edit2 size={16} />
                                Sửa
                            </button>
                            <button className='btn btn-primary'>
                                <Users size={16} />
                                Xem
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrganizationsGrid;
