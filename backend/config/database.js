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
        console.error(`
╔════════════════════════════════════════╗
║     ❌ MongoDB Connection Failed       ║
╠════════════════════════════════════════╣
║ Error: ${error.message}
║ MongoDB URI: ${process.env.MONGODB_URI}
╚════════════════════════════════════════╝
        `);
        process.exit(1);
    }
};

module.exports = connectDB;
