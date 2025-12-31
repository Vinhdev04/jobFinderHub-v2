const express = require('express');
const router = express.Router();
const { protect, isRecruiter } = require('../middleware/auth');
const interviewController = require('../controller/interviewController');

// Get all interviews
router.get('/', protect, interviewController.getAllInterviews);

// Get interviews by candidate
router.get('/candidate/:studentId', protect, interviewController.getInterviewsByStudent);

// Get interview by ID
router.get('/:id', protect, interviewController.getInterviewById);

// Create interview (recruiter only)
router.post('/', protect, isRecruiter, interviewController.createInterview);

// Update interview
router.put('/:id', protect, interviewController.updateInterview);

// Complete interview with results
router.put('/:id/complete', protect, isRecruiter, interviewController.completeInterview);

// Cancel/Delete interview
router.delete('/:id', protect, interviewController.cancelInterview);

module.exports = router;