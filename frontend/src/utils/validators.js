// frontend/src/utils/validators.js

export const validateEmail = (email) => {
    if (!email) {
        return 'Email không được để trống';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email không hợp lệ';
    }
    return '';
};

export const validatePhone = (phone) => {
    if (!phone) {
        return 'Số điện thoại không được để trống';
    }
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone)) {
        return 'Số điện thoại không hợp lệ';
    }
    return '';
};

export const validatePassword = (password) => {
    if (!password) {
        return 'Mật khẩu không được để trống';
    }
    if (password.length < 6) {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
};

export const validateRegisterForm = (formData) => {
    const errors = {};

    // Validate họ tên
    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    // Validate phone
    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    // Validate confirm password
    if (!formData.confirmPassword) {
        errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Validate role-specific fields
    switch (formData.role) {
        case 'student':
            if (!formData.studentId) {
                errors.studentId = 'Mã sinh viên không được để trống';
            } else if (formData.studentId.length < 5) {
                errors.studentId = 'Mã sinh viên không hợp lệ';
            }
            break;

        case 'recruiter':
        case 'company-manager':
            if (!formData.companyName) {
                errors.companyName = 'Tên công ty không được để trống';
            }
            if (!formData.position) {
                errors.position = 'Vị trí công việc không được để trống';
            }
            break;

        case 'academic-staff':
            if (!formData.teacherCode) {
                errors.teacherCode = 'Mã giáo viên không được để trống';
            }
            break;

        default:
            break;
    }

    // Validate agree terms
    if (!formData.agreeTerms) {
        errors.agreeTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateLoginForm = (formData) => {
    const errors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};