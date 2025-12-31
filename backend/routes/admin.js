const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const adminController = require('../controller/adminController');

router.use(protect);
router.get(
    '/settings',
    authorize('quan_tri_he_thong'),
    adminController.getSettings
);
router.put(
    '/settings',
    authorize('quan_tri_he_thong'),
    adminController.updateSettings
);
router.get(
    '/backup',
    authorize('quan_tri_he_thong'),
    adminController.backupDatabase
);

module.exports = router;
