export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return 'Email không được để trống';
    }
    if (!emailRegex.test(email)) {
        return 'Email không hợp lệ';
    }
    return '';
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
    if (!password) {
        return 'Mật khẩu không được để trống';
    }
    if (password.length < 6) {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (!/(?=.*[a-z])/.test(password)) {
        return 'Mật khẩu phải có ít nhất 1 chữ thường';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
        return 'Mật khẩu phải có ít nhất 1 chữ hoa';
    }
    if (!/(?=.*\d)/.test(password)) {
        return 'Mật khẩu phải có ít nhất 1 số';
    }
    return '';
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phone) {
        return 'Số điện thoại không được để trống';
    }
    if (!phoneRegex.test(phone)) {
        return 'Số điện thoại không hợp lệ';
    }
    return '';
};

/**
 * Validate full name
 */
export const validateFullName = (name) => {
    if (!name || !name.trim()) {
        return 'Họ và tên không được để trống';
    }
    if (name.trim().length < 2) {
        return 'Họ và tên phải có ít nhất 2 ký tự';
    }
    if (name.trim().length > 100) {
        return 'Họ và tên không được quá 100 ký tự';
    }
    return '';
};

/**
 * Validate student ID
 */
export const validateStudentId = (studentId, isRequired = true) => {
    if (isRequired && !studentId) {
        return 'Mã sinh viên không được để trống';
    }
    return '';
};

/**
 * Validate confirm password
 */
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
        return 'Xác nhận mật khẩu không được để trống';
    }
    if (password !== confirmPassword) {
        return 'Mật khẩu xác nhận không khớp';
    }
    return '';
};

/**
 * Validate all login fields
 */
export const validateLoginForm = (formData) => {
    const errors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    if (!formData.password) {
        errors.password = 'Mật khẩu không được để trống';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Validate all register fields
 */
export const validateRegisterForm = (formData) => {
    const errors = {};

    const nameError = validateFullName(formData.fullName);
    if (nameError) errors.fullName = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
        formData.password,
        formData.confirmPassword
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    if (formData.role === 'student') {
        const studentIdError = validateStudentId(formData.studentId);
        if (studentIdError) errors.studentId = studentIdError;
    }

    if (
        formData.role === 'recruiter' ||
        formData.role === 'company-manager'
    ) {
        if (!formData.companyName) {
            errors.companyName = 'Tên công ty không được để trống';
        }
        if (!formData.position) {
            errors.position = 'Chức vụ không được để trống';
        }
    }

    if (!formData.agreeTerms) {
        errors.agreeTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
