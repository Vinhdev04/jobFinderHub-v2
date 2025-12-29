const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    uploadAvatar,
    updateProfile
} = require('../controller/userController');

// Tất cả routes đều cần protect
router.use(protect);

router.route('/').get(authorize('quan_tri_he_thong', 'giao_vu'), getAllUsers);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(authorize('quan_tri_he_thong'), deleteUser);

router.put('/:id/avatar', uploadAvatar);
router.put('/:id/profile', updateProfile);

module.exports = router;
