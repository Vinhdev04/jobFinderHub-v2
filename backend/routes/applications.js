const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, isCandidate, isRecruiter } = require('../middleware/auth');
const applicationController = require('../controller/applicationController');

// Multer setup
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'cvs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, name);
    }
});
const upload = multer({ storage });

// Public routes
router.get('/', applicationController.getAllApplications);
router.get('/job/:jobId', protect, applicationController.getApplicationsByJob);
router.get('/candidate/:studentId', protect, applicationController.getApplicationsByStudent);
router.get('/:id', applicationController.getApplicationById);

// Protected routes
router.post('/', protect, isCandidate, upload.single('cv'), applicationController.createApplication);

// ✅ FIX: Add PUT /:id route for updating application
router.put('/:id', protect, applicationController.updateApplicationStatus);
router.put('/:id/status', protect, applicationController.updateApplicationStatus);

router.delete('/:id', protect, applicationController.withdrawApplication);

module.exports = router;