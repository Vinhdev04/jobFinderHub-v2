// backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://localhost:27017/jobfinder_db'
        );

        console.log(`MongoDB đã kết nối: ${conn.connection.host}`);

        // Lắng nghe các sự kiện
        mongoose.connection.on('connected', () => {
            console.log('Mongoose đã kết nối tới MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Lỗi kết nối MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose đã ngắt kết nối');
        });

        // Xử lý tắt ứng dụng
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Đã đóng kết nối MongoDB do ứng dụng bị tắt');
            process.exit(0);
        });
    } catch (error) {
        console.error(`❌ Lỗi kết nối database: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
