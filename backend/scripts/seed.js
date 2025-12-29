const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/database');
const User = require('../models/User');
const Company = require('../models/Company');
const JobPosting = require('../models/JobPosting');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Xóa dữ liệu cũ
        await User.deleteMany();
        await Company.deleteMany();
        await JobPosting.deleteMany();

        console.log('Đã xóa dữ liệu cũ');

        // Tạo admin
        const admin = await User.create({
            hoVaTen: 'Admin System',
            email: 'admin@jobfinder.com',
            matKhau: 'admin123',
            soDienThoai: '0123456789',
            vaiTro: 'quan_tri_he_thong'
        });

        console.log('Đã tạo admin');

        // Tạo công ty mẫu
        const company = await Company.create({
            tenCongTy: 'FPT Software',
            moTa: 'Công ty công nghệ hàng đầu Việt Nam',
            diaChi: 'Hà Nội, Việt Nam',
            linhVuc: 'Công nghệ thông tin',
            quyMo: '1000+',
            email: 'hr@fpt.com',
            soDienThoai: '0987654321',
            daXacMinh: true
        });

        // Tạo nhà tuyển dụng
        const recruiter = await User.create({
            hoVaTen: 'HR Manager',
            email: 'hr@fpt.com',
            matKhau: 'recruiter123',
            soDienThoai: '0987654321',
            vaiTro: 'nhan_vien_tuyen_dung',
            congTy: company._id
        });

        // Tạo sinh viên
        const student = await User.create({
            hoVaTen: 'Nguyễn Văn A',
            email: 'nguyenvana@student.edu.vn',
            matKhau: 'student123',
            soDienThoai: '0123456789',
            vaiTro: 'sinh_vien',
            thongTinSinhVien: {
                maSinhVien: 'SV001',
                ngaySinh: new Date('2002-05-15'),
                diaChi: 'Hà Nội, Việt Nam',
                hocVan: [
                    {
                        truong: 'Đại học Bách Khoa Hà Nội',
                        chuyenNganh: 'Công nghệ thông tin',
                        namBatDau: 2020,
                        namKetThuc: 2024,
                        gpa: 3.5
                    }
                ],
                kyNang: ['React', 'TypeScript', 'Node.js', 'TailwindCSS']
            }
        });

        // Tạo tin tuyển dụng
        await JobPosting.create({
            tieuDe: 'Thực tập sinh Frontend Developer',
            viTri: 'Frontend Developer',
            congTy: company._id,
            moTaCongViec:
                'Tham gia phát triển các dự án web application sử dụng React và TypeScript',
            yeuCau: 'Có kiến thức cơ bản về HTML, CSS, JavaScript. Biết React là một lợi thế',
            quyenLoi: 'Hỗ trợ học phí, bảo hiểm, cơ hội được đào tạo bài bản',
            kyNangYeuCau: ['React', 'TypeScript', 'TailwindCSS'],
            loaiCongViec: 'thuc_tap',
            mucLuong: {
                min: 3000000,
                max: 5000000,
                donVi: 'VND',
                hienThi: true
            },
            diaDiem: 'Hà Nội',
            soLuongTuyen: 5,
            hanNopHoSo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            trangThai: 'da_duyet',
            nguoiTao: recruiter._id,
            nganhNghe: 'Công nghệ thông tin'
        });

        console.log('Đã seed dữ liệu mẫu thành công!');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi seed data:', error);
        process.exit(1);
    }
};

seedData();
