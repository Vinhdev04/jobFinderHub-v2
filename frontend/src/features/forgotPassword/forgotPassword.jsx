import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@components/common/Modal/Modal';
import authService from '@services/authService.js';
import { validateEmail } from '@utils/validators.js';
import './ForgotPassword.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authService.forgotPassword(email);

            if (response.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại');
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
            title='Quên mật khẩu'
            subtitle='Nhập email để nhận hướng dẫn đặt lại mật khẩu'
            size='default'
        >
            <div className='forgot-password-form'>
                {success ? (
                    <div className='forgot-password-form__success'>
                        <div className='forgot-password-form__success-icon'>
                            <svg
                                width='48'
                                height='48'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                            >
                                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                                <polyline points='22 4 12 14.01 9 11.01' />
                            </svg>
                        </div>
                        <h3>Email đã được gửi!</h3>
                        <p>
                            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu tới email{' '}
                            <strong>{email}</strong>
                        </p>
                        <p className='forgot-password-form__note'>
                            Vui lòng kiểm tra hộp thư đến hoặc thư rác. Link sẽ hết hạn sau 10 phút.
                        </p>
                        <Link
                            to='/login'
                            className='forgot-password-form__button'
                        >
                            Quay lại đăng nhập
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className='forgot-password-form__error'>
                                {error}
                            </div>
                        )}

                        <div className='forgot-password-form__info'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                            >
                                <circle cx='12' cy='12' r='10' />
                                <line x1='12' y1='16' x2='12' y2='12' />
                                <line x1='12' y1='8' x2='12.01' y2='8' />
                            </svg>
                            <p>
                                Nhập địa chỉ email bạn đã đăng ký. Chúng tôi sẽ gửi
                                hướng dẫn đặt lại mật khẩu cho bạn.
                            </p>
                        </div>

                        <div className='forgot-password-form__field'>
                            <label className='forgot-password-form__label'>
                                Email
                            </label>
                            <input
                                type='email'
                                className='forgot-password-form__input'
                                placeholder='your.email@example.com'
                                value={email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='forgot-password-form__button'
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi email'}
                        </button>

                        <div className='forgot-password-form__footer'>
                            <Link to='/login' className='forgot-password-form__link'>
                                ← Quay lại đăng nhập
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default ForgotPasswordPage;