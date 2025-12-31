// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { activityLogger, logError } = require('./middleware/activityLogger');
const activityRoutes = require('./routes/activities');
const {
    protect,
    isAdmin,
    isRecruiter,
    isCandidate
} = require('./middleware/auth');
const path = require('path');
const fs = require('fs');

// Configure uploads directory
const uploadsDir = path.join(__dirname, 'public', 'uploads', 'cvs');
try {
    fs.mkdirSync(uploadsDir, { recursive: true });
} catch (err) {
    console.warn('Could not create uploads directory:', uploadsDir, err.message);
}

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

// Activity logger - record admin/user actions (only logs when req.user present)
app.use(activityLogger());

// ========================
// STATIC FILES
// ========================
// Serve uploaded files (avatars, cvs)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// Serve backups
app.use('/backups', express.static(path.join(__dirname, 'public', 'backups')));

// ========================
// API ROUTES
// ========================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/managers', require('./routes/managers'));

// ========================
// NOTIFICATION & REPORT ROUTES (Still inline - can be moved to routes files later)
// ========================
const notificationController = require('./controller/notificationController');
const reportController = require('./controller/reportController');

app.get('/api/notifications', protect, notificationController.getNotifications);
app.put('/api/notifications/:id/read', protect, notificationController.markAsRead);
app.put('/api/notifications/mark-all-read', protect, notificationController.markAllAsRead);
app.delete('/api/notifications/:id', protect, notificationController.deleteNotification);
app.post('/api/notifications', protect, isAdmin, notificationController.createNotification);
app.delete('/api/notifications/delete-read', protect, notificationController.deleteAllReadNotifications);

app.get('/api/reports/dashboard', protect, isAdmin, reportController.getDashboardStats);
app.get('/api/reports', protect, isAdmin, reportController.getReports);
app.get('/api/reports/:id', protect, isAdmin, reportController.getReportById);
app.post('/api/reports/generate', protect, isAdmin, reportController.generateReport);

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