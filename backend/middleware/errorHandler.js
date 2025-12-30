// backend/middleware/errorHandler.js

/**
 * Not Found Middleware
 */
const notFound = (req, res, next) => {
    const error = new Error(`Route không tìm thấy - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Error Handler Middleware
 * ✅ QUAN TRỌNG: Phải có 4 parameters (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
    // Log error để debug
    console.error('❌ Error Handler Caught:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Lấy status code từ response hoặc từ error
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Không tìm thấy tài nguyên';
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyPattern)[0];
        message = `${field} đã tồn tại trong hệ thống`;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map(e => e.message);
        message = errors.join(', ');
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Token không hợp lệ';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token đã hết hạn';
    }

    // Response với error
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && {
            error: err.message,
            stack: err.stack
        })
    });
};

module.exports = {
    notFound,
    errorHandler
};