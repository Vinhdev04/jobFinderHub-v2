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
        <nav className={`navbar ${isDark ? 'navbar--dark' : 'navbar--light'}`}>
            <div className='container d-flex justify-content-center'>
                <div className='navbar__content '>
                    {/* Logo */}
                    <Link to='/' className='navbar__logo'>
                        <div className='navbar__logo-icon'>
                            <Building2 className='navbar__icon' />
                        </div>
                        <div className='navbar__logo-text'>
                            <h1 className='navbar__logo-title'>
                                Hệ thống thực tập
                            </h1>
                            <p className='navbar__logo-subtitle'>
                                Kết nối cơ hội
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className='navbar__menu navbar__menu--desktop'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`navbar__link ${
                                    isActiveLink(link.href)
                                        ? 'navbar__link--active'
                                        : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className='navbar__actions navbar__actions--desktop'>
                        {isAuthenticated ? (
                            <div className='navbar__user-menu'>
                                <button
                                    className='navbar__user-trigger'
                                    onClick={toggleUserMenu}
                                >
                                    <User size={20} />
                                    <span>{user?.fullName || 'User'}</span>
                                </button>
                                {isUserMenuOpen && (
                                    <div className='navbar__dropdown'>
                                        <Link
                                            to='/profile'
                                            className='navbar__dropdown-item'
                                            onClick={toggleUserMenu}
                                        >
                                            <User size={18} />
                                            <span>Hồ sơ của tôi</span>
                                        </Link>
                                        <Link
                                            to='/dashboard'
                                            className='navbar__dropdown-item'
                                            onClick={toggleUserMenu}
                                        >
                                            <Building2 size={18} />
                                            <span>Bảng điều khiển</span>
                                        </Link>
                                        <button
                                            className='navbar__dropdown-item navbar__dropdown-item--logout'
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
                    <button className='navbar__mobile-toggle' onClick={toggle}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className='navbar__menu navbar__menu--mobile'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`navbar__mobile-link ${
                                    isActiveLink(link.href)
                                        ? 'navbar__mobile-link--active'
                                        : ''
                                }`}
                                onClick={toggle}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className='navbar__mobile-actions'>
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
