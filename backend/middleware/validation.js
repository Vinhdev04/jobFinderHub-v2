/*
Validation middleware với express-validator
- validateRegister
- validateLogin
- validateJobPosting
- validateApplication
- validateInterview
*/
// ============================================
// backend/middleware/validation.js
// ============================================
const { body, validationResult } = require('express-validator');

/**
 * Xử lý lỗi validation
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Dữ liệu không hợp lệ',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};

/**
 * Validation cho đăng ký
 */
exports.validateRegister = [
    body('hoVaTen')
        .trim()
        .notEmpty()
        .withMessage('Họ và tên không được để trống')
        .isLength({ min: 2, max: 100 })
        .withMessage('Họ và tên phải từ 2-100 ký tự'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Email không hợp lệ')
        .normalizeEmail(),

    body('matKhau')
        .notEmpty()
        .withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),

    body('soDienThoai')
        .trim()
        .notEmpty()
        .withMessage('Số điện thoại không được để trống')
        .matches(/^(0|\+84)[0-9]{9,10}$/)
        .withMessage('Số điện thoại không hợp lệ'),

    body('vaiTro')
        .optional()
        .isIn(['sinh_vien', 'giao_vu', 'nhan_vien_tuyen_dung', 'quan_ly_doanh_nghiep'])
        .withMessage('Vai trò không hợp lệ'),

    body('maSinhVien')
        .if(body('vaiTro').equals('sinh_vien'))
        .notEmpty()
        .withMessage('Mã sinh viên không được để trống'),

    handleValidationErrors
];

/**
 * Validation cho đăng nhập
 */
exports.validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Email không hợp lệ'),

    body('matKhau')
        .notEmpty()
        .withMessage('Mật khẩu không được để trống'),

    body('vaiTro')
        .optional()
        .isIn(['sinh_vien', 'giao_vu', 'nhan_vien_tuyen_dung', 'quan_tri_he_thong', 'quan_ly_doanh_nghiep'])
        .withMessage('Vai trò không hợp lệ'),

    handleValidationErrors
];

/**
 * Validation cho forgot password
 */
exports.validateForgotPassword = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Email không hợp lệ'),

    handleValidationErrors
];

/**
 * Validation cho reset password
 */
exports.validateResetPassword = [
    body('matKhau')
        .notEmpty()
        .withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),

    body('xacNhanMatKhau')
        .notEmpty()
        .withMessage('Xác nhận mật khẩu không được để trống')
        .custom((value, { req }) => {
            if (value !== req.body.matKhau) {
                throw new Error('Mật khẩu xác nhận không khớp');
            }
            return true;
        }),

    handleValidationErrors
];

/**
 * Validation cho change password
 */
exports.validateChangePassword = [
    body('matKhauCu')
        .notEmpty()
        .withMessage('Mật khẩu cũ không được để trống'),

    body('matKhauMoi')
        .notEmpty()
        .withMessage('Mật khẩu mới không được để trống')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Mật khẩu mới phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số')
        .custom((value, { req }) => {
            if (value === req.body.matKhauCu) {
                throw new Error('Mật khẩu mới phải khác mật khẩu cũ');
            }
            return true;
        }),

    handleValidationErrors
];
