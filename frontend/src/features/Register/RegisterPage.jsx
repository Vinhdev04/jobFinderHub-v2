// frontend/src/features/Register/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.jsx';
import { useToast } from '@hooks/useToast.jsx';
import Modal from '@components/common/Modal/Modal';
import { validateRegisterForm } from '@utils/validators.js';
import './RegisterPage.css';

// Add field error styles if not already in CSS
const fieldErrorStyle = {
    color: 'var(--color-error)',
    fontSize: 'var(--font-size-sm)',
    marginTop: 'var(--spacing-xs)',
    display: 'block'
};

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        role: 'student',
        fullName: '',
        phone: '',
        email: '',
        studentId: '',
        companyName: '',
        position: '',
        department: '',
        teacherCode: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const { register } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    // ✅ MAP role từ tiếng Anh sang tiếng Việt
    const roleMapping = {
        'student': 'sinh_vien',
        'recruiter': 'nhan_vien_tuyen_dung',
        'company-manager': 'quan_ly_doanh_nghiep',
        'academic-staff': 'giao_vu',
        'admin': 'quan_tri_he_thong'
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
        setApiError('');
    };

    const handleRoleChange = (role) => {
        setFormData((prev) => ({ 
            ...prev, 
            role,
            // Reset role-specific fields
            studentId: '',
            companyName: '',
            position: '',
            department: '',
            teacherCode: ''
        }));
        setErrors({});
        setApiError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validation = validateRegisterForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            toast.error('Vui lòng kiểm tra lại thông tin');
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            // ✅ Chuẩn bị data đúng format backend expect
            const registerData = {
                hoVaTen: formData.fullName,
                email: formData.email,
                matKhau: formData.password,
                soDienThoai: formData.phone,
                vaiTro: roleMapping[formData.role] || 'sinh_vien'
            };

            // Thêm mã sinh viên nếu là sinh viên
            if (formData.role === 'student' && formData.studentId) {
                registerData.maSinhVien = formData.studentId;
            }

            // Thêm thông tin công ty nếu là nhân viên tuyển dụng hoặc quản lý DN
            if ((formData.role === 'recruiter' || formData.role === 'company-manager') && formData.companyName) {
                registerData.tenCongTy = formData.companyName;
                registerData.viTri = formData.position;
            }

            // Thêm thông tin giáo vụ
            if (formData.role === 'academic-staff') {
                registerData.maGiaoVu = formData.teacherCode;
                registerData.phongBan = formData.department;
            }

            console.log('📤 Sending register data:', registerData);

            const result = await register(registerData);

            console.log('📥 Register result:', result);

            if (result.success) {
                toast.success('🎉 Đăng ký thành công! Chào mừng bạn đến với hệ thống.', 4000);
                
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 1000);
            } else {
                setApiError(result.message || 'Đăng ký thất bại');
                toast.error(result.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('❌ Register error:', error);
            const errorMsg = error.message || 'Đăng ký thất bại';
            setApiError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    // ✅ Render role-specific fields
    const renderRoleSpecificFields = () => {
        switch (formData.role) {
            case 'student':
                return (
                    <div className='col-12'>
                        <label className='register-form__label'>Mã sinh viên *</label>
                        <input
                            type='text'
                            name='studentId'
                            className={`register-form__input ${errors.studentId ? 'register-form__input--error' : ''}`}
                            placeholder='SV123456'
                            value={formData.studentId}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {errors.studentId && (
                            <span className='register-form__field-error'>{errors.studentId}</span>
                        )}
                    </div>
                );

            case 'recruiter':
            case 'company-manager':
                return (
                    <>
                        <div className='col-12 col-md-6'>
                            <label className='register-form__label'>Tên công ty *</label>
                            <input
                                type='text'
                                name='companyName'
                                className={`register-form__input ${errors.companyName ? 'register-form__input--error' : ''}`}
                                placeholder='ABC Corporation'
                                value={formData.companyName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            {errors.companyName && (
                                <span className='register-form__field-error'>{errors.companyName}</span>
                            )}
                        </div>
                        <div className='col-12 col-md-6'>
                            <label className='register-form__label'>Vị trí công việc *</label>
                            <input
                                type='text'
                                name='position'
                                className={`register-form__input ${errors.position ? 'register-form__input--error' : ''}`}
                                placeholder='HR Manager'
                                value={formData.position}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            {errors.position && (
                                <span className='register-form__field-error'>{errors.position}</span>
                            )}
                        </div>
                    </>
                );

            case 'academic-staff':
                return (
                    <>
                        <div className='col-12 col-md-6'>
                            <label className='register-form__label'>Mã giáo viên *</label>
                            <input
                                type='text'
                                name='teacherCode'
                                className={`register-form__input ${errors.teacherCode ? 'register-form__input--error' : ''}`}
                                placeholder='GV123456'
                                value={formData.teacherCode}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            {errors.teacherCode && (
                                <span className='register-form__field-error'>{errors.teacherCode}</span>
                            )}
                        </div>
                        <div className='col-12 col-md-6'>
                            <label className='register-form__label'>Phòng ban</label>
                            <input
                                type='text'
                                name='department'
                                className='register-form__input'
                                placeholder='Phòng Đào tạo'
                                value={formData.department}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            isOpen={true}
            onClose={handleClose}
            title='Đăng ký tài khoản'
            subtitle='Tạo tài khoản để bắt đầu sử dụng hệ thống'
            size='large'
        >
            <form className='register-form' onSubmit={handleSubmit}>
                {apiError && (
                    <div className='register-form__error mb-3'>{apiError}</div>
                )}

                <div className='row g-3'>
                    {/* Chọn vai trò */}
                    <div className='col-12'>
                        <label className='register-form__label'>Bạn là *</label>
                        <div className='row g-2'>
                            <div className='col-6 col-sm-3'>
                                <button
                                    type='button'
                                    className={`register-form__role-card ${
                                        formData.role === 'student'
                                            ? 'register-form__role-card--active'
                                            : ''
                                    }`}
                                    onClick={() => handleRoleChange('student')}
                                    disabled={loading}
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                                        <circle cx='12' cy='7' r='4' />
                                    </svg>
                                    <span>Sinh viên</span>
                                </button>
                            </div>
                            <div className='col-6 col-sm-3'>
                                <button
                                    type='button'
                                    className={`register-form__role-card ${
                                        formData.role === 'recruiter'
                                            ? 'register-form__role-card--active'
                                            : ''
                                    }`}
                                    onClick={() => handleRoleChange('recruiter')}
                                    disabled={loading}
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                                        <circle cx='9' cy='7' r='4' />
                                        <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                                    </svg>
                                    <span>NV Tuyển dụng</span>
                                </button>
                            </div>
                            <div className='col-6 col-sm-3'>
                                <button
                                    type='button'
                                    className={`register-form__role-card ${
                                        formData.role === 'company-manager'
                                            ? 'register-form__role-card--active'
                                            : ''
                                    }`}
                                    onClick={() => handleRoleChange('company-manager')}
                                    disabled={loading}
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                        <rect x='3' y='3' width='18' height='18' rx='2' />
                                        <path d='M9 3v18M3 9h18M3 15h18' />
                                    </svg>
                                    <span>Quản lý DN</span>
                                </button>
                            </div>
                            <div className='col-6 col-sm-3'>
                                <button
                                    type='button'
                                    className={`register-form__role-card ${
                                        formData.role === 'academic-staff'
                                            ? 'register-form__role-card--active'
                                            : ''
                                    }`}
                                    onClick={() => handleRoleChange('academic-staff')}
                                    disabled={loading}
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                        <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
                                        <path d='M6 12v5c3 3 9 3 12 0v-5' />
                                    </svg>
                                    <span>Giáo vụ</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Họ và tên */}
                    <div className='col-12 col-md-6'>
                        <label className='register-form__label'>Họ và tên *</label>
                        <input
                            type='text'
                            name='fullName'
                            className={`register-form__input ${errors.fullName ? 'register-form__input--error' : ''}`}
                            placeholder='Nguyễn Văn A'
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {errors.fullName && (
                            <span className='register-form__field-error'>{errors.fullName}</span>
                        )}
                    </div>

                    {/* Số điện thoại */}
                    <div className='col-12 col-md-6'>
                        <label className='register-form__label'>Số điện thoại *</label>
                        <input
                            type='tel'
                            name='phone'
                            className={`register-form__input ${errors.phone ? 'register-form__input--error' : ''}`}
                            placeholder='0912345678'
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {errors.phone && (
                            <span className='register-form__field-error'>{errors.phone}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className='col-12'>
                        <label className='register-form__label'>Email *</label>
                        <input
                            type='email'
                            name='email'
                            className={`register-form__input ${errors.email ? 'register-form__input--error' : ''}`}
                            placeholder='email@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {errors.email && (
                            <span className='register-form__field-error'>{errors.email}</span>
                        )}
                    </div>

                    {/* Role-specific fields */}
                    {renderRoleSpecificFields()}

                    {/* Mật khẩu */}
                    <div className='col-12 col-md-6'>
                        <label className='register-form__label'>Mật khẩu *</label>
                        <div className='register-form__password-wrapper'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                className={`register-form__input ${errors.password ? 'register-form__input--error' : ''}`}
                                placeholder='••••••••'
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <button
                                type='button'
                                className='register-form__password-toggle'
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.password && (
                            <span className='register-form__field-error'>{errors.password}</span>
                        )}
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className='col-12 col-md-6'>
                        <label className='register-form__label'>Xác nhận mật khẩu *</label>
                        <div className='register-form__password-wrapper'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                className={`register-form__input ${errors.confirmPassword ? 'register-form__input--error' : ''}`}
                                placeholder='••••••••'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                            <button
                                type='button'
                                className='register-form__password-toggle'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                disabled={loading}
                            >
                                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className='register-form__field-error'>{errors.confirmPassword}</span>
                        )}
                    </div>
                </div>

                {/* Đồng ý điều khoản */}
                <label className='register-form__checkbox'>
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
                        <Link to='/terms' className='register-form__link'>Điều khoản sử dụng</Link>
                        {' '}và{' '}
                        <Link to='/privacy' className='register-form__link'>Chính sách bảo mật</Link>
                    </span>
                </label>
                {errors.agreeTerms && (
                    <span className='register-form__field-error d-block mt-2'>{errors.agreeTerms}</span>
                )}

                <button type='submit' className='register-form__button' disabled={loading}>
                    <span>{loading ? '⏳ Đang đăng ký...' : '🚀 Đăng ký tài khoản'}</span>
                </button>

                <div className='register-form__prompt'>
                    Đã có tài khoản?{' '}
                    <Link to='/login' className='register-form__link register-form__link--primary'>
                        Đăng nhập ngay
                    </Link>
                </div>
            </form>
        </Modal>
    );
};

export default RegisterPage;