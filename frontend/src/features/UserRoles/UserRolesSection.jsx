// src/components/features/UserRoles/UserRolesSection.jsx

import React from 'react';
import { ChevronRight } from 'lucide-react';
import USER_ROLES from '@data/userRolesData.js';
import './UserRolesSection.css';
import { NavLink } from 'react-router-dom';

const RoleCard = ({ role, index }) => {
    const Icon = role.icon;

    return (
        <div
            className='role-card animate-fadeInUp'
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div
                className={`role-icon bg-gradient-${role.color.split('-')[1]}`}
            >
                <Icon className='icon' />
            </div>
            <h3 className='role-title'>{role.title}</h3>
            <p className='role-description'>{role.description}</p>
            <button to={''} className='role-button'>
                <span>Truy cập</span>
                <ChevronRight className='button-icon' />
            </button>
        </div>
    );
};

const UserRolesSection = () => {
    return (
        <section className='user-roles-section'>
            <div className='container'>
                <div className='section-header'>
                    <h2 className='section-title animate-fadeInUp'>
                        5 vai trò người dùng
                    </h2>
                    <p
                        className='section-description animate-fadeInUp'
                        style={{ animationDelay: '0.1s' }}
                    >
                        Hệ thống phân quyền chặt chẽ theo nguyên tắc RBAC, tách
                        biệt quyền quản trị hệ thống và quyền quản lý nghiệp vụ
                    </p>
                </div>

                <div className='roles-grid'>
                    {USER_ROLES.map((role, index) => (
                        <RoleCard key={index} role={role} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserRolesSection;
