// backend/middleware/activityLogger.js
const Activity = require('../models/Activity');

/**
 * Middleware để ghi lại hoạt động của user
 * Chỉ ghi log khi có user đã authenticate và response thành công
 */
const activityLogger = (options = {}) => {
    const {
        excludePaths = ['/api/activities', '/api/auth/refresh'], // Không log những path này
        includeBody = false, // Có log request body không
        onlyMethods = ['POST', 'PUT', 'DELETE', 'PATCH'] // Chỉ log những method này
    } = options;

    return async (req, res, next) => {
        // Skip nếu path nằm trong excludePaths
        if (excludePaths.some((path) => req.originalUrl.startsWith(path))) {
            return next();
        }

        // Skip nếu method không nằm trong onlyMethods (nếu có chỉ định)
        if (onlyMethods.length > 0 && !onlyMethods.includes(req.method)) {
            return next();
        }

        // Lưu original send để wrap
        const originalSend = res.send;

        // Wrap res.send để log sau khi response
        res.send = function (data) {
            // Chỉ log khi có user và response thành công
            if (req.user && res.statusCode >= 200 && res.statusCode < 400) {
                // Tạo action description dựa vào method và path
                const action = generateActionDescription(req);

                // Tạo activity log
                const activityData = {
                    user: req.user._id,
                    userEmail: req.user.email || req.user.hoVaTen,
                    action,
                    method: req.method,
                    path: req.originalUrl,
                    ip:
                        req.ip ||
                        req.connection.remoteAddress ||
                        req.headers['x-forwarded-for'],
                    status: 'success',
                    details: {}
                };

                // Thêm body nếu cần
                if (includeBody && req.body) {
                    activityData.details.body = req.body;
                }

                // Thêm params nếu có
                if (req.params && Object.keys(req.params).length > 0) {
                    activityData.details.params = req.params;
                }

                // Lưu vào database (async, không chờ)
                Activity.create(activityData)
                    .then(() => {
                        console.log(
                            `✅ [ActivityLogger] Đã ghi log: ${action}`
                        );
                    })
                    .catch((err) => {
                        console.error(
                            '❌ [ActivityLogger] Lỗi khi ghi log:',
                            err
                        );
                    });
            }

            // Call original send
            return originalSend.call(this, data);
        };

        next();
    };
};

/**
 * Tạo mô tả action dựa vào request
 */
function generateActionDescription(req) {
    const { method, originalUrl, body } = req;

    // Custom descriptions cho các routes cụ thể
    if (originalUrl.includes('/users')) {
        if (method === 'POST')
            return `Tạo người dùng mới: ${body.email || body.hoVaTen}`;
        if (method === 'PUT' || method === 'PATCH')
            return `Cập nhật người dùng: ${body.email || body.hoVaTen}`;
        if (method === 'DELETE') return `Xóa người dùng`;
    }

    if (originalUrl.includes('/companies')) {
        if (method === 'POST') return `Tạo công ty mới: ${body.tenCongTy}`;
        if (method === 'PUT' || method === 'PATCH')
            return `Cập nhật công ty: ${body.tenCongTy}`;
        if (method === 'DELETE') return `Xóa công ty`;
    }

    if (originalUrl.includes('/auth/login')) {
        return 'Đăng nhập hệ thống';
    }

    if (originalUrl.includes('/auth/logout')) {
        return 'Đăng xuất hệ thống';
    }

    // Default description
    return `${method} ${originalUrl}`;
}

/**
 * Middleware để log lỗi
 */
const logError = async (err, req, res, next) => {
    if (req.user) {
        try {
            await Activity.create({
                user: req.user._id,
                userEmail: req.user.email,
                action: `Lỗi: ${err.message}`,
                method: req.method,
                path: req.originalUrl,
                ip: req.ip || req.connection.remoteAddress,
                status: 'error',
                details: {
                    error: err.message,
                    stack:
                        process.env.NODE_ENV === 'development'
                            ? err.stack
                            : undefined
                }
            });
            console.log('✅ [ActivityLogger] Đã ghi log lỗi');
        } catch (logErr) {
            console.error('❌ [ActivityLogger] Lỗi khi ghi log lỗi:', logErr);
        }
    }

    next(err);
};

module.exports = {
    activityLogger,
    logError
};
