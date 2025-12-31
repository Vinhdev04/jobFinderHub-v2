const express = require('express');
const router = express.Router();
const managerController = require('../controller/managerController');
const { protect, authorize } = require('../middleware/auth');

// List & detail - accessible by admin and academic staff
router.get(
    '/',
    protect,
    authorize('quan_tri_he_thong', 'giao_vu'),
    managerController.getManagers
);
router.get(
    '/:id',
    protect,
    authorize('quan_tri_he_thong', 'giao_vu'),
    managerController.getManagerById
);

// Create / update / delete - admin only
router.post(
    '/',
    protect,
    authorize('quan_tri_he_thong'),
    managerController.createManager
);
router.put(
    '/:id',
    protect,
    authorize('quan_tri_he_thong'),
    managerController.updateManager
);
router.delete(
    '/:id',
    protect,
    authorize('quan_tri_he_thong'),
    managerController.deleteManager
);

module.exports = router;
