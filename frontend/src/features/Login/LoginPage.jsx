// frontend/src/features/Login/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import Modal from '@components/common/Modal/Modal';
import { validateEmail } from '@utils/validators.js';
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        role: 'student',
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    // ✅ MAP role từ tiếng Anh sang tiếng Việt
    const roleMapping = {
        'student': 'sinh_vien',
        'academic-staff': 'giao_vu',
        'recruiter': 'nhan_vien_tuyen_dung',
        'company-manager': 'quan_ly_doanh_nghiep',
        'admin': 'quan_tri_he_thong'
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear errors khi user thay đổi input
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
        setApiError('');
    };

    const validateForm = () => {
        const newErrors = {};

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        if (!formData.password) {
            newErrors.password = 'Mật khẩu không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            // ✅ Gửi đúng format backend expect
            const loginData = {
                email: formData.email,
                matKhau: formData.password, // ✅ Sửa từ 'password' thành 'matKhau'
                vaiTro: roleMapping[formData.role] // ✅ Sửa từ 'role' thành 'vaiTro'
            };

            console.log('Sending login data:', loginData); // Debug

            const result = await login(loginData);

            if (result.success) {
                // Đăng nhập thành công, chuyển hướng
                navigate(from, { replace: true });
            } else {
                setApiError(result.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Login error:', error); // Debug
            setApiError(error.message || 'Đăng nhập thất bại');
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
            <form className='login-form' onSubmit={handleSubmit}>
                {apiError && (
                    <div className='login-form__error'>{apiError}</div>
                )}

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
                            <option value='student'>Sinh viên</option>
                            <option value='academic-staff'>Giáo vụ</option>
                            <option value='recruiter'>
                                Nhân viên tuyển dụng
                            </option>
                            <option value='company-manager'>
                                Quản lý doanh nghiệp
                            </option>
                            <option value='admin'>
                                Quản trị hệ thống
                            </option>
                        </select>
                    </div>

                    <div className='col-12'>
                        <label className='login-form__label'>Email</label>
                        <input
                            type='email'
                            name='email'
                            className={`login-form__input ${
                                errors.email ? 'login-form__input--error' : ''
                            }`}
                            placeholder='your.email@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {errors.email && (
                            <span className='login-form__field-error'>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className='col-12'>
                        <label className='login-form__label'>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            className={`login-form__input ${
                                errors.password ? 'login-form__input--error' : ''
                            }`}
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {errors.password && (
                            <span className='login-form__field-error'>
                                {errors.password}
                            </span>
                        )}
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
                    type='submit'
                    className='login-form__button'
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
            </form>
        </Modal>
    );
};

export default LoginPage;