// backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri =
            process.env.MONGODB_URI ||
            'mongodb://localhost:27017/jobfinder_db';

        // ✅ CHỈ GIỮ OPTION HỢP LỆ
        const options = {
            serverSelectionTimeoutMS: 5000,
            tlsAllowInvalidCertificates: false,
            maxPoolSize: 10,
            minPoolSize: 2,
            socketTimeoutMS: 45000
        };

        const conn = await mongoose.connect(mongoUri, options);

        console.log(`
╔════════════════════════════════════════╗
║     ✅ MongoDB Connected Successfully  ║
╠════════════════════════════════════════╣
║ Host: ${conn.connection.host}
║ Database: ${conn.connection.name}
║ Port: ${conn.connection.port}
╚════════════════════════════════════════╝
        `);

        mongoose.connection.on('connected', () => {
            console.log('✅ Mongoose: Kết nối MongoDB thành công');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose: Lỗi MongoDB:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Mongoose: Đã ngắt kết nối MongoDB');
        });

        process.on('SIGINT', async () => {
            console.log('\n📴 Đang tắt ứng dụng...');
            await mongoose.connection.close();
            console.log('✅ Đã đóng MongoDB');
            process.exit(0);
        });

        return conn;

    } catch (error) {
        console.error(`\n╔════════════════════════════════════════╗\n║     ❌ MongoDB Connection Failed       ║\n╠════════════════════════════════════════╣\n║ Error: ${error.message}\n║ MongoDB URI: ${process.env.MONGODB_URI}\n╚════════════════════════════════════════╝\n        `);
        // Do not exit the process here so the server can start for local UI debugging.
        // Return null to indicate no active DB connection. DB-dependent routes should
        // handle missing connection gracefully in development.
        return null;
    }
};

module.exports = connectDB;
