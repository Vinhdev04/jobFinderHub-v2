const jwt = require('jsonwebtoken');

/**
 * Tạo JWT token
 */
exports.signToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || '7d'
        }
    );
};

/**
 * Verify JWT token
 */
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Token không hợp lệ');
    }
};

/**
 * Tạo refresh token (nếu cần)
 */
exports.signRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );
};

/**
 * Decode token không verify (để lấy info)
 */
exports.decodeToken = (token) => {
    return jwt.decode(token);
};