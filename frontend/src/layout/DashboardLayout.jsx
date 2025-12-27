// ==================== src/layouts/DashboardLayout.jsx ====================
import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNavLinksByRole } from '@config/index.config';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = getNavLinksByRole(user?.role || 'student');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActiveRoute = (href) => {
        return location.pathname === href;
    };

    return (
        <div className='dashboard-layout'>
            {/* Sidebar */}
            <aside className='dashboard-layout__sidebar'>
                <div className='dashboard-layout__brand'>
                    <h2>JobFinder</h2>
                    <p className='dashboard-layout__role'>
                        {user?.role === 'student' && 'Sinh viên'}
                        {user?.role === 'teacher' && 'Giảng viên'}
                        {user?.role === 'company' && 'Nhà tuyển dụng'}
                    </p>
                </div>

                <nav className='dashboard-layout__nav'>
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`dashboard-layout__nav-item ${
                                isActiveRoute(link.href)
                                    ? 'dashboard-layout__nav-item--active'
                                    : ''
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(link.href);
                            }}
                        >
                            <span className='dashboard-layout__nav-icon'>
                                {link.icon}
                            </span>
                            <span className='dashboard-layout__nav-label'>
                                {link.label}
                            </span>
                        </a>
                    ))}
                </nav>

                <button
                    className='dashboard-layout__logout'
                    onClick={handleLogout}
                >
                    Đăng xuất
                </button>
            </aside>

            {/* Main content */}
            <main className='dashboard-layout__main'>{children}</main>
        </div>
    );
};

export default DashboardLayout;
