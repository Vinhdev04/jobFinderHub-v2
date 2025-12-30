// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');
const jobController = require('../controllers/jobController');
const applicationController = require('../controllers/applicationController');
const interviewController = require('../controllers/interviewController');
const notificationController = require('../controllers/notificationController');
const reportController = require('../controllers/reportController');

// Middleware (cần tạo sau)
// const { protect, restrictTo } = require('../middleware/auth');

// =====================
// AUTH ROUTES
// =====================
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authController.getMe); // cần middleware protect
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password/:token', authController.resetPassword);
router.put('/auth/change-password', authController.changePassword); // cần middleware protect
router.put('/auth/update-profile', authController.updateProfile); // cần middleware protect

// =====================
// COMPANY ROUTES
// =====================
router.get('/companies', companyController.getAllCompanies);
router.get('/companies/:id', companyController.getCompanyById);
router.post('/companies', companyController.createCompany); // cần middleware protect
router.put('/companies/:id', companyController.updateCompany); // cần middleware protect
router.delete('/companies/:id', companyController.deleteCompany); // cần middleware protect
router.put('/companies/:id/verify', companyController.verifyCompany); // cần middleware restrictTo('admin')

// =====================
// JOB POSTING ROUTES
// =====================
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/jobs', jobController.createJob); // cần middleware protect
router.put('/jobs/:id', jobController.updateJob); // cần middleware protect
router.delete('/jobs/:id', jobController.deleteJob); // cần middleware protect
router.get('/jobs/company/:companyId', jobController.getJobsByCompany);
router.put('/jobs/:id/approve', jobController.approveJob); // cần middleware restrictTo('admin')

// =====================
// APPLICATION ROUTES
// =====================
router.get('/applications', applicationController.getAllApplications);
router.get('/applications/:id', applicationController.getApplicationById);
router.post('/applications', applicationController.createApplication); // cần middleware protect
router.put('/applications/:id/status', applicationController.updateApplicationStatus); // cần middleware protect
router.delete('/applications/:id', applicationController.withdrawApplication); // cần middleware protect
router.get('/applications/candidate/:studentId', applicationController.getApplicationsByStudent);
router.get('/applications/job/:jobId', applicationController.getApplicationsByJob);

// =====================
// INTERVIEW ROUTES
// =====================
router.get('/interviews', interviewController.getAllInterviews);
router.get('/interviews/:id', interviewController.getInterviewById);
router.post('/interviews', interviewController.createInterview); // cần middleware protect
router.put('/interviews/:id', interviewController.updateInterview); // cần middleware protect
router.delete('/interviews/:id', interviewController.cancelInterview); // cần middleware protect
router.get('/interviews/candidate/:studentId', interviewController.getInterviewsByStudent);
router.put('/interviews/:id/complete', interviewController.completeInterview); // cần middleware protect

// =====================
// NOTIFICATION ROUTES
// =====================
router.get('/notifications', notificationController.getNotifications); // cần middleware protect
router.put('/notifications/:id/read', notificationController.markAsRead); // cần middleware protect
router.put('/notifications/mark-all-read', notificationController.markAllAsRead); // cần middleware protect
router.delete('/notifications/:id', notificationController.deleteNotification); // cần middleware protect
router.post('/notifications', notificationController.createNotification); // cần middleware protect + restrictTo('admin', 'system')
router.delete('/notifications/delete-read', notificationController.deleteAllReadNotifications); // cần middleware protect

// =====================
// REPORT ROUTES
// =====================
router.get('/reports/dashboard', reportController.getDashboardStats); // cần middleware restrictTo('admin')
router.get('/reports', reportController.getReports); // cần middleware restrictTo('admin')
router.get('/reports/:id', reportController.getReportById); // cần middleware restrictTo('admin')
router.post('/reports/generate', reportController.generateReport); // cần middleware restrictTo('admin')

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'API is running',
        timestamp: new Date()
    });
});

module.exports = router;