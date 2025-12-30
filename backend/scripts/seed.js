// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load biến môi trường (để lấy MONGO_URI)
dotenv.config(); 

// Import các Models (Đảm bảo đường dẫn đúng với cấu trúc folder của bạn)
const User = require('../models/User');
const Company = require('../models/Company');
const JobPosting = require('../models/JobPosting');
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const Notification = require('../models/Notification');
const Report = require('../models/Report');

// Cấu hình kết nối DB (Thay đổi chuỗi kết nối nếu cần)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://jobfinder-cluster.uftask8.mongodb.net/test'); // URL lấy từ ảnh của bạn
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // 1. Xóa dữ liệu cũ (để tránh trùng lặp khi chạy lại)
    await User.deleteMany();
    await Company.deleteMany();
    await JobPosting.deleteMany();
    await Application.deleteMany();
    await Interview.deleteMany();
    await Notification.deleteMany();
    await Report.deleteMany();
    
    console.log('Đã xóa dữ liệu cũ...');

    // 2. Tạo User (Ứng viên & Admin)
    const users = await User.create([
      {
        username: 'nguyenvana',
        email: 'a@gmail.com',
        password: 'password123', // Lưu ý: Trong thực tế password cần hash
        role: 'candidate',
        fullName: 'Nguyễn Văn A'
      },
      {
        username: 'admin_user',
        email: 'admin@gmail.com',
        password: 'password123',
        role: 'admin',
        fullName: 'Admin System'
      }
    ]);

    // 3. Tạo Company (Nhà tuyển dụng)
    const companies = await Company.create([
      {
        name: 'Tech Corp VN',
        email: 'hr@techcorp.vn',
        description: 'Công ty công nghệ hàng đầu.',
        location: 'Hồ Chí Minh',
        website: 'https://techcorp.vn'
      },
      {
        name: 'Design Pro',
        email: 'contact@designpro.com',
        description: 'Agency thiết kế sáng tạo.',
        location: 'Hà Nội'
      }
    ]);

    // 4. Tạo JobPosting (Tin tuyển dụng - Liên kết với Company)
    const jobs = await JobPosting.create([
      {
        title: 'Backend Developer (Node.js)',
        description: 'Cần tuyển lập trình viên Node.js kinh nghiệm 1 năm.',
        salary: 1500,
        company: companies[0]._id, // Link với Tech Corp VN
        location: 'Hồ Chí Minh',
        requirements: ['Node.js', 'MongoDB', 'Express']
      },
      {
        title: 'UI/UX Designer',
        description: 'Thiết kế giao diện mobile app.',
        salary: 1000,
        company: companies[1]._id, // Link với Design Pro
        location: 'Hà Nội',
        requirements: ['Figma', 'Photoshop']
      }
    ]);

    // 5. Tạo Application (Ứng tuyển - Liên kết User và Job)
    const applications = await Application.create([
      {
        user: users[0]._id, // Nguyễn Văn A
        job: jobs[0]._id,   // Ứng tuyển vào Backend Dev
        coverLetter: 'Tôi rất thích công ty này.',
        status: 'pending'
      }
    ]);

    // 6. Tạo Interview (Phỏng vấn - Liên kết Application)
    await Interview.create([
      {
        application: applications[0]._id,
        date: new Date('2024-05-20T09:00:00'),
        location: 'Online qua Google Meet',
        status: 'scheduled'
      }
    ]);

    // 7. Tạo Notification (Thông báo)
    await Notification.create([
      {
        user: users[0]._id,
        message: 'Hồ sơ của bạn đã được xem.',
        type: 'info'
      }
    ]);

    // 8. Tạo Report (Báo cáo vi phạm nếu có)
    await Report.create([
      {
        reporter: users[0]._id,
        targetId: jobs[0]._id,
        targetModel: 'JobPosting',
        reason: 'Tin tuyển dụng không chính xác'
      }
    ]);

    console.log('✅ Đã thêm dữ liệu mẫu thành công!');
    process.exit();
  } catch (err) {
    console.error(`❌ Lỗi: ${err}`);
    process.exit(1);
  }
};

// Chạy script
connectDB().then(() => {
    importData();
});