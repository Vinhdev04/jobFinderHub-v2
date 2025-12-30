// backend/middleware/errorHandler.js

/**
 * @desc    Not Found Middleware - Xử lý 404
 * @access  Public
 */
const notFound = (req, res, next) => {
    const error = new Error(`Route không tìm thấy - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * @desc    Error Handler Middleware - Xử lý tất cả lỗi
 * @note    QUAN TRỌNG: Phải có 4 parameters (err, req, res, next)
 * @access  Public
 */
const errorHandler = (err, req, res, next) => {
    // Log error để debug
    console.error('❌ Error Handler Caught:', {
        name: err.name,
        message: err.message,
        code: err.code,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });

    // Mặc định status code là 500
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Có lỗi xảy ra trên server';
    let errors = null;

    // ========================
    // MONGOOSE ERRORS
    // ========================

    // Mongoose: Invalid ObjectId (CastError)
    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Tài nguyên không tồn tại';
    }

    // Mongoose: Duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyPattern)[0];
        const value = err.keyValue[field];
        message = `${field} "${value}" đã tồn tại trong hệ thống`;
    }

    // Mongoose: Validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errors = {};
        Object.keys(err.errors).forEach(key => {
            errors[key] = err.errors[key].message;
        });
        message = 'Dữ liệu không hợp lệ';
    }

    // ========================
    // JWT ERRORS
    // ========================

    // JWT: Invalid token
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Token không hợp lệ hoặc bị hỏng';
    }

    // JWT: Token expired
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token đã hết hạn, vui lòng đăng nhập lại';
    }

    // ========================
    // CUSTOM ERRORS
    // ========================

    // Custom application error
    if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // ========================
    // RESPONSE
    // ========================

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === 'development' && {
            error: {
                name: err.name,
                message: err.message,
                stack: err.stack
            }
        })
    });
};

/**
 * @desc    Custom Error Class
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    notFound,
    errorHandler,
    AppError
};