// backend/utils/validators.js

/**
 * @desc    Kiểm tra email hợp lệ
 * @param   {String} email - Email
 * @returns {Boolean}
 */
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * @desc    Kiểm tra số điện thoại hợp lệ
 * @param   {String} phone - Số điện thoại
 * @returns {Boolean}
 */
exports.isValidPhone = (phone) => {
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/; // Vietnam format
    return phoneRegex.test(phone);
};

/**
 * @desc    Kiểm tra URL hợp lệ
 * @param   {String} url - URL
 * @returns {Boolean}
 */
exports.isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * @desc    Kiểm tra MongoDB ObjectId hợp lệ
 * @param   {String} id - ObjectId
 * @returns {Boolean}
 */
exports.isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * @desc    Kiểm tra mật khẩu có mạnh không
 * @param   {String} password - Mật khẩu
 * @returns {Object} { isStrong, errors }
 */
exports.validatePasswordStrength = (password) => {
    const errors = [];

    if (!password || password.length === 0) {
        errors.push('Mật khẩu là bắt buộc');
        return { isStrong: false, errors };
    }

    if (password.length < 6) {
        errors.push('Mật khẩu phải có ít nhất 6 ký tự');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Mật khẩu phải chứa ít nhất 1 chữ hoa');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Mật khẩu phải chứa ít nhất 1 chữ thường');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Mật khẩu phải chứa ít nhất 1 chữ số');
    }

    return {
        isStrong: errors.length === 0,
        errors
    };
};

/**
 * @desc    Kiểm tra tên hợp lệ
 * @param   {String} name - Tên
 * @returns {Boolean}
 */
exports.isValidName = (name) => {
    if (!name || name.trim().length === 0) {
        return false;
    }

    if (name.length < 2 || name.length > 100) {
        return false;
    }

    // Cho phép chữ cái, số, khoảng trắng, và một số ký tự đặc biệt
    const nameRegex = /^[\p{L}\p{N}\s'-]+$/u;
    return nameRegex.test(name);
};

/**
 * @desc    Kiểm tra tên công ty hợp lệ
 * @param   {String} companyName - Tên công ty
 * @returns {Boolean}
 */
exports.isValidCompanyName = (companyName) => {
    if (!companyName || companyName.trim().length === 0) {
        return false;
    }

    if (companyName.length < 2 || companyName.length > 200) {
        return false;
    }

    return true;
};

/**
 * @desc    Kiểm tra ngày hợp lệ
 * @param   {String|Date} date - Ngày
 * @returns {Boolean}
 */
exports.isValidDate = (date) => {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
};

/**
 * @desc    Kiểm tra ngày trong tương lai
 * @param   {String|Date} date - Ngày
 * @returns {Boolean}
 */
exports.isFutureDate = (date) => {
    return new Date(date) > new Date();
};

/**
 * @desc    Kiểm tra ngày trong quá khứ
 * @param   {String|Date} date - Ngày
 * @returns {Boolean}
 */
exports.isPastDate = (date) => {
    return new Date(date) < new Date();
};

/**
 * @desc    Kiểm tra khoảng ngày hợp lệ
 * @param   {String|Date} startDate - Ngày bắt đầu
 * @param   {String|Date} endDate - Ngày kết thúc
 * @returns {Boolean}
 */
exports.isValidDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end;
};

/**
 * @desc    Kiểm tra số lương hợp lệ
 * @param   {Number} salary - Lương
 * @returns {Boolean}
 */
exports.isValidSalary = (salary) => {
    return typeof salary === 'number' && salary > 0;
};

/**
 * @desc    Kiểm tra khoảng lương hợp lệ
 * @param   {Number} min - Lương tối thiểu
 * @param   {Number} max - Lương tối đa
 * @returns {Boolean}
 */
exports.isValidSalaryRange = (min, max) => {
    return (
        typeof min === 'number' &&
        typeof max === 'number' &&
        min > 0 &&
        max > 0 &&
        min <= max
    );
};

/**
 * @desc    Sanitize input
 * @param   {String} input - Input string
 * @returns {String} Cleaned string
 */
exports.sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return input;
    }

    return input
        .trim()
        .replace(/[<>]/g, '')
        .substring(0, 1000);
};

/**
 * @desc    Sanitize HTML
 * @param   {String} html - HTML string
 * @returns {String} Cleaned HTML
 */
exports.sanitizeHTML = (html) => {
    if (typeof html !== 'string') {
        return html;
    }

    return html
        .replace(/[<>]/g, '')
        .replace(/script/gi, '')
        .replace(/on\w+\s*=/gi, '');
};

/**
 * @desc    Validate pagination
 * @param   {Number} page - Trang
 * @param   {Number} limit - Giới hạn
 * @returns {Object} { page, limit }
 */
exports.validatePagination = (page = 1, limit = 10) => {
    const MAX_LIMIT = 100;

    page = Math.max(1, parseInt(page) || 1);
    limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(limit) || 10));

    return { page, limit };
};