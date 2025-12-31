// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const activityRoutes = require('./routes/activities');
const {
    protect,
    isAdmin,
    isRecruiter,
    isCandidate
} = require('./middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for CV uploads
const uploadsDir = path.join(__dirname, 'public', 'uploads', 'cvs');
// Ensure uploads directory exists
try {
    fs.mkdirSync(uploadsDir, { recursive: true });
} catch (err) {
    console.warn(
        'Could not create uploads directory:',
        uploadsDir,
        err.message
    );
}
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

// Connect DB
connectDB();

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// ========================
// ROUTES (ROUTER STYLE)
// ========================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/applications', require('./routes/applications'));

// Serve uploaded files (avatars, cvs)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// Serve backups
app.use('/backups', express.static(path.join(__dirname, 'public', 'backups')));

// ========================
// CONTROLLERS - ✅ FIXED: controllers/ thay vì controller/
// ========================
const companyController = require('./controller/companyController');
const jobController = require('./controller/jobController');
const applicationController = require('./controller/applicationController');
const interviewController = require('./controller/interviewController');
const notificationController = require('./controller/notificationController');
const reportController = require('./controller/reportController');

app.use('/api/activities', activityRoutes);
// ========================
// COMPANY ROUTES (router)
// ========================
app.use('/api/companies', require('./routes/companies'));

// ========================
// JOB ROUTES
// ========================
// Public routes - không cần authentication
app.get('/api/jobs', jobController.getAllJobs);
app.get('/api/jobs/company/:companyId', jobController.getJobsByCompany);
app.get('/api/jobs/:id', jobController.getJobById);

// Job details (create/update) - protected: recruiter or admin
app.post('/api/jobs/:id/detail', protect, jobController.upsertJobDetail);

// Protected routes - cần authentication
app.post('/api/jobs', protect, isRecruiter, jobController.createJob);
app.put('/api/jobs/:id', protect, jobController.updateJob);
app.delete('/api/jobs/:id', protect, jobController.deleteJob);
app.put('/api/jobs/:id/approve', protect, isAdmin, jobController.approveJob);

// ========================
// APPLICATION ROUTES
// ========================
app.get('/api/applications', applicationController.getAllApplications);
app.get('/api/applications/:id', applicationController.getApplicationById);
app.post(
    '/api/applications',
    protect,
    isCandidate,
    upload.single('cv'),
    applicationController.createApplication
);
app.put(
    '/api/applications/:id/status',
    protect,
    applicationController.updateApplicationStatus
);
app.delete(
    '/api/applications/:id',
    protect,
    applicationController.withdrawApplication
);
app.get(
    '/api/applications/candidate/:studentId',
    protect,
    applicationController.getApplicationsByStudent
);
app.get(
    '/api/applications/job/:jobId',
    protect,
    applicationController.getApplicationsByJob
);

// ========================
// INTERVIEW ROUTES
// ========================
app.get('/api/interviews', interviewController.getAllInterviews);
app.get('/api/interviews/:id', interviewController.getInterviewById);
app.post(
    '/api/interviews',
    protect,
    isRecruiter,
    interviewController.createInterview
);
app.put('/api/interviews/:id', protect, interviewController.updateInterview);
app.delete('/api/interviews/:id', protect, interviewController.cancelInterview);
app.get(
    '/api/interviews/candidate/:studentId',
    protect,
    interviewController.getInterviewsByStudent
);
app.put(
    '/api/interviews/:id/complete',
    protect,
    isRecruiter,
    interviewController.completeInterview
);

// ========================
// NOTIFICATION ROUTES
// ========================
app.get('/api/notifications', protect, notificationController.getNotifications);
app.put(
    '/api/notifications/:id/read',
    protect,
    notificationController.markAsRead
);
app.put(
    '/api/notifications/mark-all-read',
    protect,
    notificationController.markAllAsRead
);
app.delete(
    '/api/notifications/:id',
    protect,
    notificationController.deleteNotification
);
app.post(
    '/api/notifications',
    protect,
    isAdmin,
    notificationController.createNotification
);
app.delete(
    '/api/notifications/delete-read',
    protect,
    notificationController.deleteAllReadNotifications
);

// ========================
// REPORT ROUTES
// ========================
app.get(
    '/api/reports/dashboard',
    protect,
    isAdmin,
    reportController.getDashboardStats
);
app.get('/api/reports', protect, isAdmin, reportController.getReports);
app.get('/api/reports/:id', protect, isAdmin, reportController.getReportById);
app.post(
    '/api/reports/generate',
    protect,
    isAdmin,
    reportController.generateReport
);

// ========================
// HEALTH CHECK
// ========================
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        time: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// Admin router
app.use('/api/admin', require('./routes/admin'));

// Activities router
app.use('/api/activities', require('./routes/activities'));

// Teachers router
app.use('/api/teachers', require('./routes/teachers'));
// Managers router
app.use('/api/managers', require('./routes/managers'));

// ========================
// ERROR HANDLING
// ========================
app.use(notFound);
app.use(errorHandler);

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║       🚀 JOB FINDER API SERVER        ║
╠═══════════════════════════════════════╣
║ Port: ${PORT}
║ Environment: ${process.env.NODE_ENV || 'development'}
║ Health: http://localhost:${PORT}/health
╚═══════════════════════════════════════╝
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

module.exports = app;
