// src/components/features/Security/SecuritySection.jsx

import React from 'react';
import { Shield, GraduationCap, Briefcase } from 'lucide-react';
import { SECURITY_FEATURES, ROLE_DETAILS } from '../../data/securityData.js';
import './SecuritySection.css';

const SecuritySection = () => {
    const getRoleIcon = (name) => {
        switch (name) {
            case 'System Admin':
                return Shield;
            case 'Academic Staff':
                return GraduationCap;
            case 'Company Manager':
                return Briefcase;
            default:
                return Shield;
        }
    };

    return (
        <section className='security-section'>
            <div className='security-bg-pattern'></div>

            <div className='container'>
                <div className='security-header'>
                    <div className='security-header-icon animate-fadeInUp'>
                        <Shield className='icon' />
                    </div>
                    <div className='security-header-content'>
                        <h2 className='security-title animate-fadeInUp'>
                            Bảo mật & Phân quyền chuyên nghiệp
                        </h2>
                        <p
                            className='security-description animate-fadeInUp'
                            style={{ animationDelay: '0.1s' }}
                        >
                            Hệ thống áp dụng mô hình phân quyền chặt chẽ (RBAC),
                            tách biệt hoàn toàn quyền quản trị hệ thống (System
                            Admin) và quyền quản lý nghiệp vụ (Business
                            Manager), đảm bảo tính bảo mật và chuyên nghiệp.
                        </p>
                    </div>
                </div>

                <div className='security-features'>
                    {SECURITY_FEATURES.map((feature, idx) => (
                        <div
                            key={idx}
                            className='security-feature-card animate-fadeInUp'
                            style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                        >
                            <div className='security-feature-dot'></div>
                            <h3 className='security-feature-title'>
                                {feature.title}
                            </h3>
                            <p className='security-feature-description'>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div
                    className='security-roles animate-fadeInUp'
                    style={{ animationDelay: '0.5s' }}
                >
                    {ROLE_DETAILS.map((role, idx) => {
                        const Icon = getRoleIcon(role.name);
                        return (
                            <div key={idx} className='security-role'>
                                <div
                                    className={`security-role-icon bg-${role.color}`}
                                >
                                    <Icon className='icon' />
                                </div>
                                <h4 className='security-role-name'>
                                    {role.name}
                                </h4>
                                <p className='security-role-title'>
                                    {role.title}
                                </p>
                                <p className='security-role-description'>
                                    {role.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SecuritySection;
