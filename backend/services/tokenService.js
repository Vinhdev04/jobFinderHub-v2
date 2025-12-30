// backend/services/tokenService.js
const jwt = require('jsonwebtoken');

/**
 * @desc    Ký JWT token
 * @param   {String} userId - ID của người dùng
 * @returns {String} JWT token
 */
exports.signToken = (userId) => {
    if (!userId) {
        throw new Error('User ID là bắt buộc');
    }

    const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        {
            expiresIn: process.env.JWT_EXPIRE || '7d',
            issuer: 'job-finder-api',
            audience: 'job-finder-client'
        }
    );

    return token;
};

/**
 * @desc    Xác minh JWT token
 * @param   {String} token - JWT token
 * @returns {Object} Decoded token with user ID
 * @throws  {Error} Nếu token không hợp lệ
 */
exports.verifyToken = (token) => {
    if (!token) {
        throw new Error('Token là bắt buộc');
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your_jwt_secret_key_here'
        );
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token đã hết hạn');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Token không hợp lệ');
        }
        throw error;
    }
};

/**
 * @desc    Tạo refresh token (kéo dài thời gian đăng nhập)
 * @param   {String} userId - ID của người dùng
 * @returns {String} Refresh token
 */
exports.signRefreshToken = (userId) => {
    if (!userId) {
        throw new Error('User ID là bắt buộc');
    }

    const refreshToken = jwt.sign(
        { id: userId, type: 'refresh' },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        {
            expiresIn: '30d',
            issuer: 'job-finder-api',
            audience: 'job-finder-client'
        }
    );

    return refreshToken;
};

/**
 * @desc    Giải mã token không verify (để lấy thông tin)
 * @param   {String} token - JWT token
 * @returns {Object} Decoded token (có thể đã hết hạn)
 */
exports.decodeToken = (token) => {
    if (!token) {
        return null;
    }

    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
};

/**
 * @desc    Lấy thời gian hết hạn của token
 * @param   {String} token - JWT token
 * @returns {Date|null} Thời gian hết hạn hoặc null
 */
exports.getTokenExpiry = (token) => {
    const decoded = exports.decodeToken(token);
    if (!decoded || !decoded.exp) {
        return null;
    }
    return new Date(decoded.exp * 1000);
};

/**
 * @desc    Kiểm tra xem token còn hiệu lực không
 * @param   {String} token - JWT token
 * @returns {Boolean} true nếu còn hiệu lực, false nếu hết hạn
 */
exports.isTokenValid = (token) => {
    try {
        exports.verifyToken(token);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * @desc    Kiểm tra xem token sắp hết hạn (trong 1 ngày)
 * @param   {String} token - JWT token
 * @returns {Boolean} true nếu sắp hết hạn
 */
exports.isTokenExpiringSoon = (token, days = 1) => {
    const expiry = exports.getTokenExpiry(token);
    if (!expiry) {
        return true;
    }

    const now = new Date();
    const expiryThreshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return expiry <= expiryThreshold;
};