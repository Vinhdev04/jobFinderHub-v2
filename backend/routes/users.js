// backend/routes/users.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleUserLock,
    getUserStats
} = require('../controller/userController'); // ✅ FIX: controllers (số nhiều)

// ============================================
// PROTECTED ROUTES - Tất cả routes đều cần đăng nhập
// ============================================
router.use(protect);

// ============================================
// ADMIN & GIÁO VỤ ROUTES
// ============================================

/**
 * @route   GET /api/users/stats
 * @desc    Lấy thống kê users
 * @access  Private (Admin, Giáo vụ)
 */
router.get('/stats', authorize('quan_tri_he_thong', 'giao_vu'), getUserStats);

/**
 * @route   GET /api/users
 * @desc    Lấy tất cả users với pagination và filters
 * @access  Private (Admin, Giáo vụ)
 */
router.get('/', authorize('quan_tri_he_thong', 'giao_vu'), getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Lấy thông tin user theo ID
 * @access  Private (Admin, Giáo vụ, hoặc chính user đó)
 */
router.get('/:id', getUserById);

// ============================================
// ADMIN ONLY ROUTES
// ============================================

/**
 * @route   PUT /api/users/:id
 * @desc    Cập nhật thông tin user
 * @access  Private (Admin only)
 */
router.put('/:id', authorize('quan_tri_he_thong'), updateUser);

/**
 * @route   PUT /api/users/:id/lock
 * @desc    Khóa/Mở khóa tài khoản user
 * @access  Private (Admin only)
 */
router.put('/:id/lock', authorize('quan_tri_he_thong'), toggleUserLock);

/**
 * @route   DELETE /api/users/:id
 * @desc    Xóa user
 * @access  Private (Admin only)
 */
router.delete('/:id', authorize('quan_tri_he_thong'), deleteUser);

module.exports = router;