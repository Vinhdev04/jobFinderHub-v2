// src/components/common/ProtectedRoute.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className='loading-container'>
                <div className='loading-spinner'></div>
            </div>
        );
    }

    // If not authenticated, show a friendly message with a login link
    if (!isAuthenticated) {
        return (
            <div className='protected-placeholder' style={{padding: '3rem', textAlign: 'center'}}>
                <h2>Bạn cần đăng nhập để xem trang này</h2>
                <p>Vui lòng đăng nhập để tiếp tục.</p>
                <Link to='/login' className='btn btn-primary'>Đăng nhập</Link>
            </div>
        );
    }

    // Check role if required
    if (requiredRole && user?.vaiTro !== requiredRole) {
        return (
            <div className='protected-placeholder' style={{padding: '3rem', textAlign: 'center'}}>
                <h2>Không có quyền truy cập</h2>
                <p>Tài khoản của bạn không có quyền xem trang này.</p>
                <Link to='/' className='btn btn-secondary'>Về trang chủ</Link>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
