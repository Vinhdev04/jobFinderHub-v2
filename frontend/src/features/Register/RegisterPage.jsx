import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import './RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        role: 'student',
        fullName: '',
        phone: '',
        email: '',
        studentId: '',
        companyName: '',
        position: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleRoleChange = (role) => {
        setFormData((prev) => ({ ...prev, role }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.fullName || !formData.phone || !formData.email) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc');
            return false;
        }

        if (formData.role === 'student' && !formData.studentId) {
            setError('Vui lòng nhập mã sinh viên');
            return false;
        }

        if (
            (formData.role === 'recruiter' || formData.role === 'admin') &&
            (!formData.companyName || !formData.position)
        ) {
            setError('Vui lòng nhập tên công ty và chức vụ');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }

        if (!formData.agreeTerms) {
            setError('Vui lòng đồng ý với điều khoản sử dụng');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock successful registration and auto-login
            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockUser = {
                id: Date.now(),
                email: formData.email,
                fullName: formData.fullName,
                role: formData.role,
                phone: formData.phone,
                studentId: formData.studentId,
                companyName: formData.companyName,
                position: formData.position,
                avatar: null
            };

            login(mockToken, mockUser);
            navigate('/');
        } catch (err) {
            setError('Đăng ký thất bại. Vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='register-page'>
            <div className='register-container animate-fadeInUp'>
                <div className='register-header'>
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
                    <h1 className='register-title'>Đăng ký tài khoản</h1>
                    <p className='register-subtitle'>
                        Tạo tài khoản để bắt đầu sử dụng hệ thống
                    </p>
                </div>

                <form className='register-form' onSubmit={handleSubmit}>
                    {error && <div className='error-message'>{error}</div>}

                    <div className='form-group'>
                        <label className='form-label'>Bạn là *</label>
                        <div className='role-selector'>
                            <button
                                type='button'
                                className={`role-card ${
                                    formData.role === 'student' ? 'active' : ''
                                }`}
                                onClick={() => handleRoleChange('student')}
                                disabled={loading}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                >
                                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                                    <circle cx='12' cy='7' r='4' />
                                </svg>
                                <span>Sinh viên</span>
                            </button>
                            <button
                                type='button'
                                className={`role-card ${
                                    formData.role === 'recruiter'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => handleRoleChange('recruiter')}
                                disabled={loading}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                >
                                    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                                    <circle cx='9' cy='7' r='4' />
                                    <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                                </svg>
                                <span>Nhân viên tuyển dụng</span>
                            </button>
                            <button
                                type='button'
                                className={`role-card ${
                                    formData.role === 'admin' ? 'active' : ''
                                }`}
                                onClick={() => handleRoleChange('admin')}
                                disabled={loading}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                >
                                    <rect
                                        x='3'
                                        y='3'
                                        width='18'
                                        height='18'
                                        rx='2'
                                    />
                                    <path d='M9 3v18M3 9h18M3 15h18' />
                                </svg>
                                <span>Quản lý DN</span>
                            </button>
                        </div>
                    </div>

                    <div className='form-row'>
                        <div className='form-group'>
                            <label className='form-label'>Họ và tên *</label>
                            <input
                                type='text'
                                name='fullName'
                                className='form-input'
                                placeholder='Nguyễn Văn A'
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>
                                Số điện thoại *
                            </label>
                            <input
                                type='tel'
                                name='phone'
                                className='form-input'
                                placeholder='0912345678'
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Email *</label>
                        <input
                            type='email'
                            name='email'
                            className='form-input'
                            placeholder='email@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    {formData.role === 'student' && (
                        <div className='form-group'>
                            <label className='form-label'>Mã sinh viên *</label>
                            <input
                                type='text'
                                name='studentId'
                                className='form-input'
                                placeholder='SV123456'
                                value={formData.studentId}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                    )}

                    {(formData.role === 'recruiter' ||
                        formData.role === 'admin') && (
                        <div className='form-row'>
                            <div className='form-group'>
                                <label className='form-label'>
                                    Tên công ty *
                                </label>
                                <input
                                    type='text'
                                    name='companyName'
                                    className='form-input'
                                    placeholder='Công ty ABC'
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Chức vụ *</label>
                                <input
                                    type='text'
                                    name='position'
                                    className='form-input'
                                    placeholder='HR Manager'
                                    value={formData.position}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className='form-row'>
                        <div className='form-group'>
                            <label className='form-label'>Mật khẩu *</label>
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    className='form-input'
                                    placeholder='••••••••'
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                                <button
                                    type='button'
                                    className='password-toggle'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                        >
                                            <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                                            <line
                                                x1='1'
                                                y1='1'
                                                x2='23'
                                                y2='23'
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                        >
                                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                                            <circle cx='12' cy='12' r='3' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>
                                Xác nhận mật khẩu *
                            </label>
                            <div className='password-input-wrapper'>
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name='confirmPassword'
                                    className='form-input'
                                    placeholder='••••••••'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                                <button
                                    type='button'
                                    className='password-toggle'
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? (
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                        >
                                            <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                                            <line
                                                x1='1'
                                                y1='1'
                                                x2='23'
                                                y2='23'
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                        >
                                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                                            <circle cx='12' cy='12' r='3' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <label className='checkbox-label terms-label'>
                        <input
                            type='checkbox'
                            name='agreeTerms'
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <span>
                            Tôi đồng ý với{' '}
                            <Link to='/terms' className='link'>
                                Điều khoản sử dụng
                            </Link>{' '}
                            và{' '}
                            <Link to='/privacy' className='link'>
                                Chính sách bảo mật
                            </Link>
                        </span>
                    </label>

                    <button
                        type='submit'
                        className='btn-primary'
                        disabled={loading}
                    >
                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                            <circle cx='8.5' cy='7' r='4' />
                            <line x1='20' y1='8' x2='20' y2='14' />
                            <line x1='23' y1='11' x2='17' y2='11' />
                        </svg>
                        <span>
                            {loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
                        </span>
                    </button>

                    <div className='login-prompt'>
                        Đã có tài khoản?{' '}
                        <Link to='/login' className='login-link'>
                            Đăng nhập ngay
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
