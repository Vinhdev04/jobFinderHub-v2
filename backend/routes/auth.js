// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController'); // ✅ FIX: controllers (not controller)
const { protect } = require('../middleware/auth');

// ============================================
// PUBLIC ROUTES (không cần authentication)
// ============================================

/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký user mới
 * @access  Public
 */
router.post('/register', authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Quên mật khẩu - Gửi email reset
 * @access  Public
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Đặt lại mật khẩu
 * @access  Public
 */
router.post('/reset-password/:token', authController.resetPassword);

// ============================================
// PROTECTED ROUTES (yêu cầu authentication)
// ============================================

/**
 * @route   GET /api/auth/me
 * @desc    Lấy thông tin user hiện tại
 * @access  Private
 */
router.get('/me', protect, authController.getMe);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Đổi mật khẩu
 * @access  Private
 */
router.put('/change-password', protect, authController.changePassword);

/**
 * @route   PUT /api/auth/update-profile
 * @desc    Cập nhật thông tin profile
 * @access  Private
 */
router.put('/update-profile', protect, authController.updateProfile);

module.exports = router;