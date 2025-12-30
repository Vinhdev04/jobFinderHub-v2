// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Bảo vệ routes - yêu cầu đăng nhập
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Kiểm tra token trong header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để truy cập' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Tìm user
        const user = await User.findById(decoded.id).select('-matKhau');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ'
            });
        }

        // Kiểm tra trạng thái tài khoản
        if (user.trangThai !== 'hoat_dong') {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản đã bị khóa'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn'
        });
    }
};

// Phân quyền theo vai trò
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.vaiTro)) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền truy cập'
            });
        }
        next();
    };
};
