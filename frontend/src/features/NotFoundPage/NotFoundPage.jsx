// src/pages/NotFound/NotFoundPage.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='not-found-page'>
            <div className='not-found-container animate-fadeInUp'>
                {/* 404 Illustration */}
                <div className='error-illustration'>
                    <div className='error-code'>404</div>
                    <div className='error-icon'>
                        <Search size={64} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Error Message */}
                <div className='error-content'>
                    <h1 className='error-title'>Không tìm thấy trang</h1>
                    <p className='error-description'>
                        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã
                        bị di chuyển. Vui lòng kiểm tra lại URL hoặc quay về
                        trang chủ.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='error-actions'>
                    <button onClick={handleGoBack} className='btn-secondary'>
                        <ArrowLeft size={20} />
                        <span>Quay lại</span>
                    </button>
                    <Link to='/' className='btn-primary'>
                        <Home size={20} />
                        <span>Về trang chủ</span>
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className='helpful-links'>
                    <p className='links-title'>Các trang hữu ích:</p>
                    <div className='links-grid'>
                        <Link to='/' className='help-link'>
                            Trang chủ
                        </Link>
                        <Link to='/jobs' className='help-link'>
                            Việc làm
                        </Link>
                        <Link to='/news' className='help-link'>
                            Tin tức
                        </Link>
                        <Link to='/about' className='help-link'>
                            Giới thiệu
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className='decoration decoration-1'></div>
                <div className='decoration decoration-2'></div>
                <div className='decoration decoration-3'></div>
            </div>
        </div>
    );
};

export default NotFoundPage;
