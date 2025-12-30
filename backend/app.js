// backend/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
app.use(morgan('dev')); // Logging

// ============================================
// ROUTES - ✅ FIX: Đảm bảo đường dẫn đúng
// ============================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users')); // ✅ ADD THIS LINE

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// ERROR HANDLING
// ============================================
app.use(notFound);
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT} trong môi trường ${process.env.NODE_ENV}`);
});

module.exports = app;