const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
const { protect, authorize } = require('../middleware/auth');

// Public-ish: list and detail require auth + role check (admin or giao_vu)
router.get(
    '/',
    protect,
    authorize('quan_tri_he_thong', 'giao_vu'),
    teacherController.getTeachers
);
router.get(
    '/:id',
    protect,
    authorize('quan_tri_he_thong', 'giao_vu'),
    teacherController.getTeacherById
);

// Create/update/delete reserved for admin
router.post(
    '/',
    protect,
    authorize('quan_tri_he_thong'),
    teacherController.createTeacher
);
router.put(
    '/:id',
    protect,
    authorize('quan_tri_he_thong'),
    teacherController.updateTeacher
);
router.delete(
    '/:id',
    protect,
    authorize('quan_tri_he_thong'),
    teacherController.deleteTeacher
);

module.exports = router;
