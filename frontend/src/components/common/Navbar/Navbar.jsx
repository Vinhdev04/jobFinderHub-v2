// src/components/common/Navbar/Navbar.jsx

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Menu, X, User, LogOut } from 'lucide-react';
import { useToggle } from '../../../hooks/useToggle';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = ({ isDark = false }) => {
    const [isOpen, toggle] = useToggle();
    const [isUserMenuOpen, toggleUserMenu] = useToggle();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { label: 'Trang chủ', href: '/' },
        { label: 'Việc làm', href: '/jobs' },
        { label: 'Tin tức', href: '/news' },
        { label: 'Giới thiệu', href: '/about' }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActiveLink = (href) => {
        return location.pathname === href;
    };

    return (
        <nav className={`navbar ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
            <div className='container'>
                <div className='navbar-content'>
                    {/* Logo */}
                    <Link to='/' className='navbar-logo'>
                        <div className='logo-icon'>
                            <Building2 className='icon' />
                        </div>
                        <div className='logo-text'>
                            <h1 className='logo-title'>Hệ thống thực tập</h1>
                            <p className='logo-subtitle'>Kết nối cơ hội</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className='navbar-menu desktop-menu'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`nav-link ${
                                    isActiveLink(link.href) ? 'active' : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className='navbar-actions desktop-actions'>
                        {isAuthenticated ? (
                            <div className='user-menu-wrapper'>
                                <button
                                    className='user-menu-trigger'
                                    onClick={toggleUserMenu}
                                >
                                    <User size={20} />
                                    <span>{user?.fullName || 'User'}</span>
                                </button>
                                {isUserMenuOpen && (
                                    <div className='user-menu-dropdown'>
                                        <Link
                                            to='/profile'
                                            className='user-menu-item'
                                            onClick={toggleUserMenu}
                                        >
                                            <User size={18} />
                                            <span>Hồ sơ của tôi</span>
                                        </Link>
                                        <Link
                                            to='/dashboard'
                                            className='user-menu-item'
                                            onClick={toggleUserMenu}
                                        >
                                            <Building2 size={18} />
                                            <span>Bảng điều khiển</span>
                                        </Link>
                                        <button
                                            className='user-menu-item logout'
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={18} />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button variant='ghost' size='sm'>
                                        Đăng nhập
                                    </Button>
                                </Link>
                                <Link to='/register'>
                                    <Button variant='primary' size='sm'>
                                        Đăng ký
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button className='mobile-toggle' onClick={toggle}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className='mobile-menu'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`mobile-link ${
                                    isActiveLink(link.href) ? 'active' : ''
                                }`}
                                onClick={toggle}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className='mobile-actions'>
                            {isAuthenticated ? (
                                <>
                                    <Link to='/profile' onClick={toggle}>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            fullWidth
                                        >
                                            Hồ sơ của tôi
                                        </Button>
                                    </Link>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        fullWidth
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to='/login' onClick={toggle}>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            fullWidth
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                    <Link to='/register' onClick={toggle}>
                                        <Button
                                            variant='primary'
                                            size='sm'
                                            fullWidth
                                        >
                                            Đăng ký
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
