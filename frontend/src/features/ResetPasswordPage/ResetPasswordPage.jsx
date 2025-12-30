import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@components/common/Modal/Modal';
import authService from '@services/authService';
import { validatePassword, validateConfirmPassword } from '@utils/validation';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [tokenValid, setTokenValid] = useState(true);

    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra token có tồn tại không
        if (!token) {
            setTokenValid(false);
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear errors
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

        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        const confirmPasswordError = validateConfirmPassword(
            formData.password,
            formData.confirmPassword
        );
        if (confirmPasswordError)
            newErrors.confirmPassword = confirmPasswordError;

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
            const response = await authService.resetPassword(
                token,
                formData.password
            );

            if (response.success) {
                // Đặt lại mật khẩu thành công, chuyển về trang chủ
                navigate('/', { replace: true });
            }
        } catch (err) {
            if (err.message.includes('Token')) {
                setTokenValid(false);
            }
            setApiError(err.message || 'Đặt lại mật khẩu thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/login');
    };

    if (!tokenValid) {
        return (
            <Modal
                isOpen={true}
                onClose={handleClose}
                title='Link không hợp lệ'
                size='default'
            >
                <div className='reset-password-form__invalid'>
                    <div className='reset-password-form__invalid-icon'>
                        <svg
                            width='48'
                            height='48'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <circle cx='12' cy='12' r='10' />
                            <line x1='15' y1='9' x2='9' y2='15' />
                            <line x1='9' y1='9' x2='15' y2='15' />
                        </svg>
                    </div>
                    <h3>Link đặt lại mật khẩu không hợp lệ</h3>
                    <p>
                        Link này có thể đã hết hạn hoặc đã được sử dụng. Vui lòng
                        yêu cầu link mới.
                    </p>
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className='reset-password-form__button'
                    >
                        Yêu cầu link mới
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal
            isOpen={true}
            onClose={handleClose}
            title='Đặt lại mật khẩu'
            subtitle='Nhập mật khẩu mới cho tài khoản của bạn'
            size='default'
        >
            <form className='reset-password-form' onSubmit={handleSubmit}>
                {apiError && (
                    <div className='reset-password-form__error'>{apiError}</div>
                )}

                <div className='reset-password-form__field'>
                    <label className='reset-password-form__label'>
                        Mật khẩu mới
                    </label>
                    <div className='reset-password-form__password-wrapper'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            className={`reset-password-form__input ${
                                errors.password
                                    ? 'reset-password-form__input--error'
                                    : ''
                            }`}
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <button
                            type='button'
                            className='reset-password-form__password-toggle'
                            onClick={() => setShowPassword(!showPassword)}
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
                                    <line x1='1' y1='1' x2='23' y2='23' />
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
                    {errors.password && (
                        <span className='reset-password-form__field-error'>
                            {errors.password}
                        </span>
                    )}
                    <div className='reset-password-form__hint'>
                        Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường
                        và số
                    </div>
                </div>

                <div className='reset-password-form__field'>
                    <label className='reset-password-form__label'>
                        Xác nhận mật khẩu
                    </label>
                    <div className='reset-password-form__password-wrapper'>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            className={`reset-password-form__input ${
                                errors.confirmPassword
                                    ? 'reset-password-form__input--error'
                                    : ''
                            }`}
                            placeholder='••••••••'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <button
                            type='button'
                            className='reset-password-form__password-toggle'
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
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
                                    <line x1='1' y1='1' x2='23' y2='23' />
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
                    {errors.confirmPassword && (
                        <span className='reset-password-form__field-error'>
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <button
                    type='submit'
                    className='reset-password-form__button'
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                </button>
            </form>
        </Modal>
    );
};

export default ResetPasswordPage;