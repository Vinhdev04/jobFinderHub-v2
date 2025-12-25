import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        role: 'student',
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock successful login
            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockUser = {
                id: 1,
                email: formData.email,
                fullName: 'Nguyễn Văn A',
                role: formData.role,
                avatar: null
            };

            login(mockToken, mockUser);
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);

            setError('Email hoặc mật khẩu không đúng');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-container animate-fadeInUp'>
                <div className='login-header'>
                    <div className='logo-icon'>
                        <svg
                            width='40'
                            height='40'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <rect
                                x='3'
                                y='6'
                                width='18'
                                height='15'
                                rx='2'
                                stroke='white'
                                strokeWidth='2'
                            />
                            <path
                                d='M3 10h18M8 3v4M16 3v4'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                            />
                        </svg>
                    </div>
                    <h1 className='login-title'>Đăng nhập hệ thống</h1>
                    <p className='login-subtitle'>
                        Quản lý thực tập & tuyển dụng thời gian thực
                    </p>
                </div>

                <form className='login-form' onSubmit={handleSubmit}>
                    {error && <div className='error-message'>{error}</div>}

                    <div className='form-group'>
                        <label className='form-label'>Vai trò</label>
                        <select
                            name='role'
                            className='form-select'
                            value={formData.role}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value='student'>Sinh viên</option>
                            <option value='recruiter'>
                                Nhân viên tuyển dụng
                            </option>
                            <option value='admin'>Quản lý DN</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Email</label>
                        <input
                            type='email'
                            name='email'
                            className='form-input'
                            placeholder='your.email@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            className='form-input'
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='form-footer'>
                        <label className='checkbox-label'>
                            <input
                                type='checkbox'
                                name='rememberMe'
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <Link to='/forgot-password' className='forgot-link'>
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type='submit'
                        className='btn-primary'
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>

                    <div className='register-prompt'>
                        Chưa có tài khoản?{' '}
                        <Link to='/register' className='register-link'>
                            Đăng ký ngay
                        </Link>
                    </div>
                </form>

                <div className='login-footer'>
                    <p>Hệ thống quản lý thực tập & tuyển dụng</p>
                    <p>© 2024 - Bảo mật & Chuyên nghiệp</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
