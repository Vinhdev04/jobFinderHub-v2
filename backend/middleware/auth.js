// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Bảo vệ routes - yêu cầu đăng nhập
 * @access  Private
 */
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

        // Fallback: allow token in query string for CSV download (short-lived token usage)
        if (!token && req.query && req.query.token) {
            token = req.query.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để truy cập'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');

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
        console.error('❌ Auth error:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token đã hết hạn'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn'
        });
    }
};

/**
 * @desc    Phân quyền theo vai trò
 * @param   {...roles} Các vai trò được phép
 * @access  Private
 */
exports.authorize = (...roles) => {
    return (req, res, next) => {
        // Use `vaiTro` field on User model
        if (!roles.includes(req.user.vaiTro)) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền truy cập'
            });
        }
        next();
    };
};

/**
 * @desc    Kiểm tra xem user là admin
 * @access  Private
 */
exports.isAdmin = (req, res, next) => {
    if (req.user.vaiTro !== 'quan_tri_he_thong') {
        return res.status(403).json({
            success: false,
            message: 'Chỉ admin mới có thể truy cập'
        });
    }
    next();
};

/**
 * @desc    Kiểm tra xem user là nhà tuyển dụng
 * @access  Private
 */
exports.isRecruiter = (req, res, next) => {
    if (req.user.vaiTro !== 'nhan_vien_tuyen_dung') {
        return res.status(403).json({
            success: false,
            message: 'Chỉ nhà tuyển dụng mới có thể truy cập'
        });
    }
    next();
};

/**
 * @desc    Kiểm tra xem user là ứng viên
 * @access  Private
 */
exports.isCandidate = (req, res, next) => {
    if (req.user.vaiTro !== 'sinh_vien') {
        return res.status(403).json({
            success: false,
            message: 'Chỉ ứng viên mới có thể truy cập'
        });
    }
    next();
};