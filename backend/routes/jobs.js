const express = require('express');
const router = express.Router();
const { protect, isAdmin, isRecruiter } = require('../middleware/auth');
const jobController = require('../controller/jobController');

// Public routes - không cần authentication
router.get('/', jobController.getAllJobs);
router.get('/company/:companyId', jobController.getJobsByCompany);
router.get('/:id', jobController.getJobById);

// Protected routes - cần authentication
router.post('/', protect, isRecruiter, jobController.createJob);
router.put('/:id', protect, jobController.updateJob); // Will check ownership inside controller
router.delete('/:id', protect, jobController.deleteJob); // Will check ownership inside controller
router.put('/:id/approve', protect, isAdmin, jobController.approveJob);

// Job details (create/update)
router.post('/:id/detail', protect, jobController.upsertJobDetail);

module.exports = router;