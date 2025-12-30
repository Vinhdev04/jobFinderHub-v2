/**
 * Validate email format
 */
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (VN format)
 */
exports.isValidPhoneNumber = (phone) => {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
};

/**
 * Validate password strength
 */
exports.isStrongPassword = (password) => {
    // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

/**
 * Sanitize user input
 */
exports.sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript:
        .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Validate file upload
 */
exports.isValidFileUpload = (file, allowedTypes, maxSize) => {
    if (!file) return false;
    
    // Check file type
    if (!allowedTypes.includes(file.mimetype)) {
        return false;
    }
    
    // Check file size (maxSize in MB)
    if (file.size > maxSize * 1024 * 1024) {
        return false;
    }
    
    return true;
};