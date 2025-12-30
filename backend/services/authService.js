// backend/services/authService.js
const bcrypt = require('bcryptjs');
const tokenService = require('./tokenService');

/**
 * @desc    Mã hóa mật khẩu
 * @param   {String} password - Mật khẩu gốc
 * @returns {Promise<String>} Mật khẩu đã mã hóa
 */
exports.hashPassword = async (password) => {
    if (!password) {
        throw new Error('Mật khẩu là bắt buộc');
    }

    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

/**
 * @desc    So sánh mật khẩu gốc với mật khẩu đã mã hóa
 * @param   {String} inputPassword - Mật khẩu nhập vào
 * @param   {String} hashedPassword - Mật khẩu đã mã hóa
 * @returns {Promise<Boolean>} true nếu khớp, false nếu không
 */
exports.comparePassword = async (inputPassword, hashedPassword) => {
    if (!inputPassword || !hashedPassword) {
        throw new Error('Mật khẩu là bắt buộc');
    }

    return bcrypt.compare(inputPassword, hashedPassword);
};

/**
 * @desc    Tạo JWT token cho user
 * @param   {String} userId - User ID
 * @returns {String} JWT token
 */
exports.generateToken = (userId) => {
    return tokenService.signToken(userId);
};

/**
 * @desc    Tạo refresh token cho user
 * @param   {String} userId - User ID
 * @returns {String} Refresh token
 */
exports.generateRefreshToken = (userId) => {
    return tokenService.signRefreshToken(userId);
};

/**
 * @desc    Tạo tokens (access + refresh)
 * @param   {String} userId - User ID
 * @returns {Object} { accessToken, refreshToken }
 */
exports.generateTokens = (userId) => {
    return {
        accessToken: exports.generateToken(userId),
        refreshToken: exports.generateRefreshToken(userId)
    };
};

/**
 * @desc    Xác minh token
 * @param   {String} token - JWT token
 * @returns {Object} Decoded token
 * @throws  {Error} Nếu token không hợp lệ
 */
exports.verifyToken = (token) => {
    return tokenService.verifyToken(token);
};

/**
 * @desc    Chuẩn bị dữ liệu user để trả về client
 * @param   {Object} user - User document từ database
 * @returns {Object} User data an toàn
 */
exports.getUserResponse = (user) => {
    // Normalize a user object for frontend consumption
    const avatar = user.anhDaiDien || user.avatar || user.hinhDaiDien || null;
    const thongTinSinhVien = user.thongTinSinhVien || {};
    const cv = thongTinSinhVien.cv || null;
    const hocVan = Array.isArray(thongTinSinhVien.hocVan) ? thongTinSinhVien.hocVan : (user.hocVan || []);
    const kyNang = Array.isArray(thongTinSinhVien.kyNang) ? thongTinSinhVien.kyNang : (user.kyNang || []);

    return {
        _id: user._id,
        hoVaTen: user.hoVaTen || user.hoTen || user.name || '',
        email: user.email,
        soDienThoai: user.soDienThoai || user.phone || '',
        diaChi: user.diaChi || thongTinSinhVien.diaChi || '',
        avatar,
        cv,
        hocVan,
        kyNang,
        vaiTro: user.vaiTro,
        trangThai: user.trangThai,
        createdAt: user.createdAt
    };
};

/**
 * @desc    Tạo token reset password
 * @param   {String} token - Random token
 * @returns {Object} { hashedToken, expiryTime }
 */
exports.generatePasswordResetToken = (token = null) => {
    const crypto = require('crypto');
    
    const resetToken = token || crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

    return {
        resetToken,
        hashedToken,
        expiryTime
    };
};

/**
 * @desc    Kiểm tra xem mật khẩu có mạnh không
 * @param   {String} password - Mật khẩu
 * @returns {Object} { isStrong, message }
 */
exports.validatePasswordStrength = (password) => {
    if (!password) {
        return {
            isStrong: false,
            message: 'Mật khẩu là bắt buộc'
        };
    }

    if (password.length < 6) {
        return {
            isStrong: false,
            message: 'Mật khẩu phải có ít nhất 6 ký tự'
        };
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
        return {
            isStrong: false,
            message: 'Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
        };
    }

    return {
        isStrong: true,
        message: 'Mật khẩu mạnh'
    };
};

/**
 * @desc    Kiểm tra xem email hợp lệ không
 * @param   {String} email - Email
 * @returns {Boolean} true nếu hợp lệ
 */
exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * @desc    Sanitize user input
 * @param   {String} input - Input string
 * @returns {String} Cleaned string
 */
exports.sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return input;
    }

    return input
        .trim()
        .replace(/[<>]/g, '') // Loại bỏ < và >
        .substring(0, 255); // Giới hạn độ dài
};