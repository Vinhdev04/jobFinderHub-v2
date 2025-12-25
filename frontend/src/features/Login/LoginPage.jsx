import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import Modal from '@components/common/Modal/Modal';
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
            await new Promise((resolve) => setTimeout(resolve, 1000));

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

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <Modal
            isOpen={true}
            onClose={handleClose}
            title='Đăng nhập hệ thống'
            subtitle='Quản lý thực tập & tuyển dụng thời gian thực'
            size='default'
        >
            <div className='login-form'>
                {error && <div className='login-form__error'>{error}</div>}

                <div className='row g-3'>
                    <div className='col-12'>
                        <label className='login-form__label'>Vai trò</label>
                        <select
                            name='role'
                            className='login-form__select'
                            value={formData.role}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value='academic-staff'>Giáo vụ</option>
                            <option value='student'>Sinh viên</option>
                            <option value='admin'>Quản trị hệ thống</option>
                            <option value='recruiter'>
                                Nhân viên tuyển dụng
                            </option>
                            <option value='company-manager'>
                                Quản lý doanh nghiệp
                            </option>
                        </select>
                    </div>

                    <div className='col-12'>
                        <label className='login-form__label'>Email</label>
                        <input
                            type='email'
                            name='email'
                            className='login-form__input'
                            placeholder='your.email@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='col-12'>
                        <label className='login-form__label'>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            className='login-form__input'
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='col-12'>
                        <div className='login-form__footer'>
                            <label className='login-form__checkbox'>
                                <input
                                    type='checkbox'
                                    name='rememberMe'
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <span>Ghi nhớ đăng nhập</span>
                            </label>
                            <Link
                                to='/forgot-password'
                                className='login-form__link'
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>
                </div>

                <button
                    type='button'
                    className='login-form__button'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                <div className='login-form__prompt'>
                    Chưa có tài khoản?{' '}
                    <Link
                        to='/register'
                        className='login-form__link login-form__link--primary'
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default LoginPage;
