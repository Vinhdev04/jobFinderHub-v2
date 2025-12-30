
// backend/seed/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');
// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const User = require('../models/User');
const Company = require('../models/Company');
const JobPosting = require('../models/JobPosting');
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const Notification = require('../models/Notification');
const Report = require('../models/Report');

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jobfinder_user:123456Aa@jobfinder-cluster.uftask8.mongodb.net/job-finder?appName=jobfinder-cluster');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// Seed data
const seedData = async () => {
    try {
        console.log('Starting database seed...');

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Company.deleteMany({});
        await JobPosting.deleteMany({});
        await Application.deleteMany({});
        await Interview.deleteMany({});
        await Notification.deleteMany({});
        await Report.deleteMany({});
        console.log('Cleared existing data');

        // ==================== CREATE USERS ====================
        console.log('Creating users...');
        
        // Use a plaintext default password here; the User model will hash it via pre-save middleware
        const plainPassword = 'Password123!';

        const users = await User.create([
            // Admin
            {
                hoVaTen: 'Admin System',
                email: 'admin@jobfinder.com',
                matKhau: plainPassword,
                soDienThoai: '0901234567',
                vaiTro: 'quan_tri_he_thong',
                trangThai: 'hoat_dong'
            },
            // Giáo vụ
            {
                hoVaTen: 'Trần Thị Giáo Vụ',
                email: 'giaovu@school.edu.vn',
                matKhau: plainPassword,
                soDienThoai: '0902234567',
                vaiTro: 'giao_vu',
                trangThai: 'hoat_dong',
                thongTinGiaoVu: {
                    maGiaoVu: 'GV001',
                    phongBan: 'Phòng Đào tạo',
                    chucVu: 'Trưởng phòng'
                }
            },
            // Nhà tuyển dụng 1
            {
                hoVaTen: 'Nguyễn Văn Tuyển',
                email: 'recruiter1@techcorp.com',
                matKhau: plainPassword,
                soDienThoai: '0903234567',
                vaiTro: 'nhan_vien_tuyen_dung',
                trangThai: 'hoat_dong'
            },
            // Nhà tuyển dụng 2
            {
                hoVaTen: 'Lê Thị HR',
                email: 'hr@innovate.vn',
                matKhau: plainPassword,
                soDienThoai: '0904234567',
                vaiTro: 'nhan_vien_tuyen_dung',
                trangThai: 'hoat_dong'
            },
            // Quản lý doanh nghiệp
            {
                hoVaTen: 'Phạm Văn Manager',
                email: 'manager@startup.io',
                matKhau: plainPassword,
                soDienThoai: '0905234567',
                vaiTro: 'quan_ly_doanh_nghiep',
                trangThai: 'hoat_dong'
            },
            // Sinh viên 1
            {
                hoVaTen: 'Trần Minh Anh',
                email: 'minhanh@student.edu.vn',
                matKhau: plainPassword,
                soDienThoai: '0906234567',
                vaiTro: 'sinh_vien',
                trangThai: 'hoat_dong',
                thongTinSinhVien: {
                    maSinhVien: 'SV2024001',
                    khoa: 'Công nghệ thông tin',
                    nganh: 'Kỹ thuật phần mềm',
                    lop: 'K19CNPM',
                    namNhapHoc: 2019
                }
            },
            // Sinh viên 2
            {
                hoVaTen: 'Nguyễn Thị Lan',
                email: 'thilan@student.edu.vn',
                matKhau: plainPassword,
                soDienThoai: '0907234567',
                vaiTro: 'sinh_vien',
                trangThai: 'hoat_dong',
                thongTinSinhVien: {
                    maSinhVien: 'SV2024002',
                    khoa: 'Công nghệ thông tin',
                    nganh: 'Khoa học máy tính',
                    lop: 'K19KHMT',
                    namNhapHoc: 2019
                }
            },
            // Sinh viên 3
            {
                hoVaTen: 'Lê Văn Hùng',
                email: 'vanhung@student.edu.vn',
                matKhau: plainPassword,
                soDienThoai: '0908234567',
                vaiTro: 'sinh_vien',
                trangThai: 'hoat_dong',
                thongTinSinhVien: {
                    maSinhVien: 'SV2024003',
                    khoa: 'Kinh tế',
                    nganh: 'Quản trị kinh doanh',
                    lop: 'K19QTKD',
                    namNhapHoc: 2019
                }
            },
            // Sinh viên 4
            {
                hoVaTen: 'Phạm Thị Mai',
                email: 'thimai@student.edu.vn',
                matKhau: hashedPassword,
                soDienThoai: '0909234567',
                vaiTro: 'sinh_vien',
                trangThai: 'hoat_dong',
                thongTinSinhVien: {
                    maSinhVien: 'SV2024004',
                    khoa: 'Marketing',
                    nganh: 'Marketing số',
                    lop: 'K19MKT',
                    namNhapHoc: 2019
                }
            },
            // Sinh viên 5
            {
                hoVaTen: 'Hoàng Văn Nam',
                email: 'vannam@student.edu.vn',
                matKhau: hashedPassword,
                soDienThoai: '0910234567',
                vaiTro: 'sinh_vien',
                trangThai: 'hoat_dong',
                thongTinSinhVien: {
                    maSinhVien: 'SV2024005',
                    khoa: 'Công nghệ thông tin',
                    nganh: 'An toàn thông tin',
                    lop: 'K19ATTT',
                    namNhapHoc: 2019
                }
            }
        ]);

        console.log(`Created ${users.length} users`);

        const [admin, giaoVu, recruiter1, recruiter2, manager, student1, student2, student3, student4, student5] = users;

        // ==================== CREATE COMPANIES ====================
        console.log('Creating companies...');

        const companies = await Company.create([
            {
                tenCongTy: 'Tech Corp Vietnam',
                moTa: 'Công ty công nghệ hàng đầu Việt Nam, chuyên về phát triển phần mềm và giải pháp AI',
                logo: 'https://tse2.mm.bing.net/th/id/OIP.SVCmw5xOUXiMjndykUjmZgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
                diaChi: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
                website: 'https://techcorp.vn',
                linhVuc: 'Công nghệ thông tin',
                quyMo: '201-500',
                email: 'contact@techcorp.vn',
                soDienThoai: '0281234567',
                daXacMinh: true,
                nguoiDaiDien: [recruiter1._id],
                trangThai: 'hoat_dong',
                thongKe: {
                    soLuongTinTuyenDung: 5,
                    soLuongUngVien: 15,
                    soLuongDaTuyen: 3
                }
            },
            {
                tenCongTy: 'Innovate Solutions',
                moTa: 'Startup về giải pháp số hóa cho doanh nghiệp, tập trung vào Cloud và Mobile',
                logo: 'https://tse2.mm.bing.net/th/id/OIP.1e2OxaTEP5dgpQBwG0EdMAHaEP?rs=1&pid=ImgDetMain&o=7&rm=3',
                diaChi: '456 Đường Lê Lợi, Quận 3, TP.HCM',
                website: 'https://innovate.vn',
                linhVuc: 'Công nghệ thông tin',
                quyMo: '51-200',
                email: 'hr@innovate.vn',
                soDienThoai: '0282345678',
                daXacMinh: true,
                nguoiDaiDien: [recruiter2._id],
                trangThai: 'hoat_dong',
                thongKe: {
                    soLuongTinTuyenDung: 3,
                    soLuongUngVien: 8,
                    soLuongDaTuyen: 2
                }
            },
            {
                tenCongTy: 'Digital Marketing Pro',
                moTa: 'Công ty chuyên về marketing số, SEO, và quảng cáo trực tuyến',
                logo: 'https://th.bing.com/th/id/OIP.GAv4AX7ymWtZ2Rxjja9nDgHaC-?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
                diaChi: '789 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
                website: 'https://digitalmarketingpro.vn',
                linhVuc: 'Marketing',
                quyMo: '51-200',
                email: 'jobs@digitalmarketingpro.vn',
                soDienThoai: '0283456789',
                daXacMinh: true,
                nguoiDaiDien: [manager._id],
                trangThai: 'hoat_dong',
                thongKe: {
                    soLuongTinTuyenDung: 2,
                    soLuongUngVien: 5,
                    soLuongDaTuyen: 1
                }
            },
            {
                tenCongTy: 'FinTech Startup',
                moTa: 'Startup công nghệ tài chính, phát triển ứng dụng thanh toán và quản lý tài chính cá nhân',
                logo: 'https://www.prismetric.com/wp-content/uploads/2023/02/fintech-startup-what-you-must-know.jpg',
                diaChi: '321 Đường Võ Văn Tần, Quận 3, TP.HCM',
                website: 'https://fintechstartup.io',
                linhVuc: 'Công nghệ tài chính',
                quyMo: '1-50',
                email: 'careers@fintechstartup.io',
                soDienThoai: '0284567890',
                daXacMinh: false,
                nguoiDaiDien: [manager._id],
                trangThai: 'hoat_dong',
                thongKe: {
                    soLuongTinTuyenDung: 1,
                    soLuongUngVien: 3,
                    soLuongDaTuyen: 0
                }
            },
            {
                tenCongTy: 'E-Commerce Giant',
                moTa: 'Công ty thương mại điện tử lớn, cung cấp nền tảng mua bán trực tuyến',
                logo: 'https://img.etoday.co.kr/pto_db/2020/09/600/20200906161705_1506981_1200_777.jpg',
                diaChi: '555 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
                website: 'https://ecommercegiant.vn',
                linhVuc: 'Thương mại điện tử',
                quyMo: '501-1000',
                email: 'recruitment@ecommercegiant.vn',
                soDienThoai: '0285678901',
                daXacMinh: true,
                nguoiDaiDien: [recruiter1._id],
                trangThai: 'hoat_dong',
                thongKe: {
                    soLuongTinTuyenDung: 4,
                    soLuongUngVien: 12,
                    soLuongDaTuyen: 2
                }
            }
        ]);

        console.log(`Created ${companies.length} companies`);

        const [techCorp, innovate, digitalMKT, finTech, eCommerce] = companies;

        // Update users with company references
        await User.findByIdAndUpdate(recruiter1._id, { congTy: techCorp._id });
        await User.findByIdAndUpdate(recruiter2._id, { congTy: innovate._id });
        await User.findByIdAndUpdate(manager._id, { congTy: digitalMKT._id });

        // ==================== CREATE JOB POSTINGS ====================
        console.log('Creating job postings...');

        const jobs = await JobPosting.create([
            // Tech Corp Jobs
            {
                tieuDe: 'Tuyển dụng Lập trình viên React/Node.js Senior',
                viTri: 'Senior Full-stack Developer',
                congTy: techCorp._id,
                moTaCongViec: `
**Mô tả công việc:**
- Phát triển và bảo trì các ứng dụng web sử dụng React.js và Node.js
- Thiết kế và triển khai RESTful APIs
- Làm việc với MongoDB, MySQL
- Code review và mentor junior developers
- Tham gia thiết kế kiến trúc hệ thống

**Yêu cầu:**
- 3+ năm kinh nghiệm với React.js và Node.js
- Thành thạo JavaScript, TypeScript
- Kinh nghiệm với Redux, React Hooks
- Hiểu biết về Docker, CI/CD
                `,
                yeuCau: `
- Tốt nghiệp Đại học chuyên ngành CNTT
- 3+ năm kinh nghiệm phát triển web
- Thành thạo React.js, Node.js, TypeScript
- Có kinh nghiệm làm việc với MongoDB, PostgreSQL
- Kỹ năng giao tiếp tốt, làm việc nhóm
                `,
                quyenLoi: `
- Lương: 25-35 triệu (thỏa thuận theo năng lực)
- Thưởng dự án, thưởng quý
- Bảo hiểm đầy đủ
- Làm việc tại văn phòng hiện đại
- Team building, du lịch hàng năm
- Cơ hội thăng tiến rõ ràng
                `,
                kyNangYeuCau: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Git', 'Docker'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 25000000,
                    max: 35000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
                soLuongTuyen: 2,
                hanNopHoSo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                trangThai: 'da_duyet',
                nguoiTao: recruiter1._id,
                nganhNghe: 'Công nghệ thông tin',
                soLuotXem: 125,
                soLuongUngTuyen: 0
            },
            {
                tieuDe: 'Thực tập sinh Lập trình Frontend',
                viTri: 'Frontend Developer Intern',
                congTy: techCorp._id,
                moTaCongViec: 'Hỗ trợ team phát triển giao diện web với React.js. Học hỏi và làm việc với các senior developers.',
                yeuCau: 'Sinh viên năm 3, 4 chuyên ngành CNTT. Có kiến thức cơ bản về HTML, CSS, JavaScript. Ham học hỏi.',
                quyenLoi: 'Lương: 5-8 triệu. Được đào tạo bài bản. Cơ hội full-time sau thực tập.',
                kyNangYeuCau: ['HTML', 'CSS', 'JavaScript', 'React'],
                loaiCongViec: 'thuc_tap',
                mucLuong: {
                    min: 5000000,
                    max: 8000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
                soLuongTuyen: 3,
                hanNopHoSo: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: recruiter1._id,
                nganhNghe: 'Công nghệ thông tin',
                soLuotXem: 89,
                soLuongUngTuyen: 0
            },
            {
                tieuDe: 'Backend Developer (Node.js/Python)',
                viTri: 'Backend Developer',
                congTy: techCorp._id,
                moTaCongViec: 'Phát triển APIs và services cho các ứng dụng web/mobile. Làm việc với microservices architecture.',
                yeuCau: '2+ năm kinh nghiệm Node.js hoặc Python. Hiểu biết về databases, caching, message queues.',
                quyenLoi: 'Lương: 20-30 triệu. Bảo hiểm, thưởng tháng 13. Remote 2 ngày/tuần.',
                kyNangYeuCau: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'RabbitMQ'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 20000000,
                    max: 30000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
                soLuongTuyen: 2,
                hanNopHoSo: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: recruiter1._id,
                nganhNghe: 'Công nghệ thông tin',
                soLuotXem: 78,
                soLuongUngTuyen: 0
            },

            // Innovate Solutions Jobs
            {
                tieuDe: 'Mobile Developer (React Native)',
                viTri: 'Mobile Developer',
                congTy: innovate._id,
                moTaCongViec: 'Phát triển ứng dụng mobile đa nền tảng với React Native. Tối ưu performance và user experience.',
                yeuCau: '2+ năm kinh nghiệm React Native. Đã publish apps lên App Store/Play Store.',
                quyenLoi: 'Lương: 18-28 triệu. Bảo hiểm, laptop MacBook. Flexible working hours.',
                kyNangYeuCau: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 18000000,
                    max: 28000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '456 Đường Lê Lợi, Quận 3, TP.HCM',
                soLuongTuyen: 2,
                hanNopHoSo: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: recruiter2._id,
                nganhNghe: 'Công nghệ thông tin',
                soLuotXem: 95,
                soLuongUngTuyen: 0
            },
            {
                tieuDe: 'DevOps Engineer',
                viTri: 'DevOps Engineer',
                congTy: innovate._id,
                moTaCongViec: 'Xây dựng và quản lý CI/CD pipeline. Deploy và monitor hệ thống trên AWS/GCP.',
                yeuCau: '2+ năm kinh nghiệm DevOps. Thành thạo Docker, Kubernetes, Jenkins.',
                quyenLoi: 'Lương: 22-32 triệu. Bảo hiểm, training budget. Work-life balance.',
                kyNangYeuCau: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 22000000,
                    max: 32000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '456 Đường Lê Lợi, Quận 3, TP.HCM',
                soLuongTuyen: 1,
                hanNopHoSo: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: recruiter2._id,
                nganhNghe: 'Công nghệ thông tin',
                soLuotXem: 67,
                soLuongUngTuyen: 0
            },

            // Digital Marketing Pro Jobs
            {
                tieuDe: 'Digital Marketing Executive',
                viTri: 'Marketing Executive',
                congTy: digitalMKT._id,
                moTaCongViec: 'Lên kế hoạch và thực hiện các chiến dịch marketing online. Quản lý social media, SEO, Google Ads.',
                yeuCau: '1-2 năm kinh nghiệm digital marketing. Biết Google Analytics, Facebook Ads.',
                quyenLoi: 'Lương: 12-18 triệu + KPI. Môi trường trẻ, năng động. Training marketing skills.',
                kyNangYeuCau: ['SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Analytics'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 12000000,
                    max: 18000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '789 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
                soLuongTuyen: 2,
                hanNopHoSo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: manager._id,
                nganhNghe: 'Marketing',
                soLuotXem: 112,
                soLuongUngTuyen: 0
            },
            {
                tieuDe: 'Content Writer/Creator',
                viTri: 'Content Creator',
                congTy: digitalMKT._id,
                moTaCongViec: 'Sáng tạo nội dung cho website, blog, social media. Viết bài chuẩn SEO.',
                yeuCau: 'Đam mê viết lách. Có khả năng sáng tạo nội dung. Biết cơ bản về SEO.',
                quyenLoi: 'Lương: 10-15 triệu. Làm việc sáng tạo. Flexible working time.',
                kyNangYeuCau: ['Content Writing', 'SEO', 'Copywriting', 'Social Media'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 10000000,
                    max: 15000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '789 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
                soLuongTuyen: 1,
                hanNopHoSo: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: manager._id,
                nganhNghe: 'Marketing',
                soLuotXem: 88,
                soLuongUngTuyen: 0
            },

            // FinTech Startup Job
            {
                tieuDe: 'Junior Full-stack Developer (Startup)',
                viTri: 'Junior Full-stack Developer',
                congTy: finTech._id,
                moTaCongViec: 'Tham gia phát triển nền tảng fintech. Làm việc với công nghệ mới. Cơ hội học hỏi và phát triển nhanh.',
                yeuCau: 'Tốt nghiệp CNTT. Biết JavaScript, React, Node.js cơ bản. Nhiệt huyết với startup.',
                quyenLoi: 'Lương: 12-18 triệu + Equity. Môi trường startup năng động. Cơ hội tăng lương nhanh.',
                kyNangYeuCau: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 12000000,
                    max: 18000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '321 Đường Võ Văn Tần, Quận 3, TP.HCM',
                soLuongTuyen: 2,
                hanNopHoSo: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
                trangThai: 'cho_duyet',
                nguoiTao: manager._id,
                nganhNghe: 'Công nghệ thông tin',
                soLuotXem: 45,
                soLuongUngTuyen: 0
            },

            // E-Commerce Jobs
            {
                tieuDe: 'Data Analyst',
                viTri: 'Data Analyst',
                congTy: eCommerce._id,
                moTaCongViec: 'Phân tích dữ liệu bán hàng, hành vi khách hàng. Tạo reports và insights cho management.',
                yeuCau: 'Tốt nghiệp chuyên ngành liên quan. Biết SQL, Excel, Power BI. Tư duy phân tích tốt.',
                quyenLoi: 'Lương: 15-22 triệu. Bảo hiểm đầy đủ. Môi trường lớn, ổn định.',
                kyNangYeuCau: ['SQL', 'Excel', 'Power BI', 'Python', 'Statistics'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 15000000,
                    max: 22000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '555 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
                soLuongTuyen: 2,
                hanNopHoSo: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: recruiter1._id,
                nganhNghe: 'Phân tích dữ liệu',
                soLuotXem: 102,
                soLuongUngTuyen: 0
            },
            {
                tieuDe: 'UI/UX Designer',
                viTri: 'UI/UX Designer',
                congTy: eCommerce._id,
                moTaCongViec: 'Thiết kế giao diện app/web. Tạo wireframes, prototypes. Làm việc với product team.',
                yeuCau: '1-2 năm kinh nghiệm UI/UX. Thành thạo Figma, Adobe XD. Có portfolio.',
                quyenLoi: 'Lương: 15-25 triệu. Bảo hiểm. Công ty lớn, nhiều dự án.',
                kyNangYeuCau: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
                loaiCongViec: 'toan_thoi_gian',
                mucLuong: {
                    min: 15000000,
                    max: 25000000,
                    donVi: 'VND',
                    hienThi: true
                },
                diaDiem: '555 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
                soLuongTuyen: 1,
                hanNopHoSo: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
                trangThai: 'da_duyet',
                nguoiTao: recruiter1._id,
                nganhNghe: 'Thiết kế',
                soLuotXem: 134,
                soLuongUngTuyen: 0
            }
        ]);

        console.log(`Created ${jobs.length} job postings`);

        // ==================== CREATE APPLICATIONS ====================
        console.log('Creating applications...');

        const applications = await Application.create([
            // Student 1 applications
            {
                tinTuyenDung: jobs[0]._id, // Senior Full-stack
                ungVien: student1._id,
                trangThai: 'duoc_moi_phong_van',
                cvDinhKem: {
                    tenFile: 'CV_TranMinhAnh.pdf',
                    duongDan: 'https://example.com/cv/tran-minh-anh.pdf'
                },
                thuGioiThieu: 'Em là sinh viên năm 4 chuyên ngành CNTT, có 2 năm kinh nghiệm làm việc part-time với React và Node.js. Em rất mong muốn được làm việc tại Tech Corp để phát triển kỹ năng và đóng góp cho công ty.',
                ngayNop: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student1._id
                    },
                    {
                        trangThai: 'duoc_moi_phong_van',
                        thoiGian: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: recruiter1._id,
                        ghiChu: 'Profile phù hợp, mời phỏng vấn'
                    }
                ]
            },
            {
                tinTuyenDung: jobs[3]._id, // Mobile Developer
                ungVien: student1._id,
                trangThai: 'dang_xem_xet',
                cvDinhKem: {
                    tenFile: 'CV_TranMinhAnh.pdf',
                    duongDan: 'https://example.com/cv/tran-minh-anh.pdf'
                },
                thuGioiThieu: 'Em có kinh nghiệm với React và muốn chuyển sang React Native để phát triển mobile apps.',
                ngayNop: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student1._id
                    }
                ]
            },

            // Student 2 applications
            {
                tinTuyenDung: jobs[1]._id, // Frontend Intern
                ungVien: student2._id,
                trangThai: 'da_nhan',
                cvDinhKem: {
                    tenFile: 'CV_NguyenThiLan.pdf',
                    duongDan: 'https://example.com/cv/nguyen-thi-lan.pdf'
                },
                thuGioiThieu: 'Em là sinh viên năm 3, đã tự học React và làm vài projects nhỏ. Em rất muốn được thực tập để học hỏi kinh nghiệm thực tế.',
                ngayNop: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                danhGia: {
                    diem: 8.5,
                    nhanXet: 'Sinh viên nhiệt huyết, học nhanh. Đồng ý nhận thực tập.',
                    nguoiDanhGia: recruiter1._id,
                    ngayDanhGia: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
                },
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student2._id
                    },
                    {
                        trangThai: 'duoc_moi_phong_van',
                        thoiGian: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: recruiter1._id
                    },
                    {
                        trangThai: 'da_nhan',
                        thoiGian: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: recruiter1._id,
                        ghiChu: 'Đồng ý tuyển dụng'
                    }
                ]
            },
            {
                tinTuyenDung: jobs[8]._id, // Data Analyst
                ungVien: student2._id,
                trangThai: 'tu_choi',
                cvDinhKem: {
                    tenFile: 'CV_NguyenThiLan.pdf',
                    duongDan: 'https://example.com/cv/nguyen-thi-lan.pdf'
                },
                thuGioiThieu: 'Em quan tâm đến vị trí Data Analyst và muốn ứng tuyển.',
                ngayNop: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                ghiChuNhaTuyenDung: 'Chưa đủ kinh nghiệm về SQL và phân tích dữ liệu',
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student2._id
                    },
                    {
                        trangThai: 'tu_choi',
                        thoiGian: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: recruiter1._id,
                        ghiChu: 'Chưa phù hợp với yêu cầu'
                    }
                ]
            },

            // Student 3 applications
            {
                tinTuyenDung: jobs[5]._id, // Digital Marketing
                ungVien: student3._id,
                trangThai: 'duoc_moi_phong_van',
                cvDinhKem: {
                    tenFile: 'CV_LeVanHung.pdf',
                    duongDan: 'https://example.com/cv/le-van-hung.pdf'
                },
                thuGioiThieu: 'Em tốt nghiệp chuyên ngành Quản trị Kinh doanh, có kiến thức về marketing. Em muốn phát triển sự nghiệp trong lĩnh vực digital marketing.',
                ngayNop: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student3._id
                    },
                    {
                        trangThai: 'duoc_moi_phong_van',
                        thoiGian: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: manager._id
                    }
                ]
            },

            // Student 4 applications
            {
                tinTuyenDung: jobs[6]._id, // Content Writer
                ungVien: student4._id,
                trangThai: 'dang_xem_xet',
                cvDinhKem: {
                    tenFile: 'CV_PhamThiMai.pdf',
                    duongDan: 'https://example.com/cv/pham-thi-mai.pdf'
                },
                thuGioiThieu: 'Em là sinh viên Marketing, yêu thích viết lách và sáng tạo nội dung. Em đã có blog cá nhân với 5000+ followers.',
                ngayNop: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student4._id
                    }
                ]
            },

            // Student 5 applications
            {
                tinTuyenDung: jobs[2]._id, // Backend Developer
                ungVien: student5._id,
                trangThai: 'dang_xem_xet',
                cvDinhKem: {
                    tenFile: 'CV_HoangVanNam.pdf',
                    duongDan: 'https://example.com/cv/hoang-van-nam.pdf'
                },
                thuGioiThieu: 'Em là sinh viên chuyên ngành An toàn thông tin, có kinh nghiệm với Python và Node.js. Em muốn phát triển kỹ năng backend development.',
                ngayNop: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student5._id
                    }
                ]
            },
            {
                tinTuyenDung: jobs[4]._id, // DevOps
                ungVien: student5._id,
                trangThai: 'dang_xem_xet',
                cvDinhKem: {
                    tenFile: 'CV_HoangVanNam.pdf',
                    duongDan: 'https://example.com/cv/hoang-van-nam.pdf'
                },
                thuGioiThieu: 'Em quan tâm đến DevOps và đã tự học Docker, Kubernetes. Em muốn ứng tuyển để có cơ hội làm việc và học hỏi thêm.',
                ngayNop: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                lichSuTrangThai: [
                    {
                        trangThai: 'dang_xem_xet',
                        thoiGian: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                        nguoiThayDoi: student5._id
                    }
                ]
            }
        ]);

        console.log(`Created ${applications.length} applications`);

        // Update job posting application counts
        await JobPosting.findByIdAndUpdate(jobs[0]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[1]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[2]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[3]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[4]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[5]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[6]._id, { soLuongUngTuyen: 1 });
        await JobPosting.findByIdAndUpdate(jobs[8]._id, { soLuongUngTuyen: 1 });

        // ==================== CREATE INTERVIEWS ====================
        console.log('Creating interviews...');

        const interviews = await Interview.create([
            {
                donUngTuyen: applications[0]._id, // Student 1 - Senior Full-stack
                ungVien: student1._id,
                tinTuyenDung: jobs[0]._id,
                thoiGianPhongVan: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
                hinhThuc: 'truc_tiep',
                diaDiem: 'Phòng họp A, Tầng 5, 123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
                nguoiPhongVan: [recruiter1._id],
                trangThai: 'da_hen',
                ghiChu: 'Mang theo laptop và demo projects'
            },
            {
                donUngTuyen: applications[2]._id, // Student 2 - Frontend Intern (completed)
                ungVien: student2._id,
                tinTuyenDung: jobs[1]._id,
                thoiGianPhongVan: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                hinhThuc: 'truc_tuyen',
                diaDiem: 'https://meet.google.com/abc-defg-hij',
                nguoiPhongVan: [recruiter1._id],
                trangThai: 'hoan_thanh',
                ghiChu: 'Phỏng vấn online qua Google Meet',
                ketQua: {
                    danhGia: 'A',
                    diem: 8.5,
                    nhanXet: 'Ứng viên có kiến thức tốt về React, thái độ tích cực. Đồng ý tuyển dụng làm thực tập sinh.',
                    quyetDinh: 'tuyen'
                }
            },
            {
                donUngTuyen: applications[4]._id, // Student 3 - Digital Marketing
                ungVien: student3._id,
                tinTuyenDung: jobs[5]._id,
                thoiGianPhongVan: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                hinhThuc: 'truc_tiep',
                diaDiem: 'Văn phòng Digital Marketing Pro, 789 Đường Trần Hưng Đạo',
                nguoiPhongVan: [manager._id],
                trangThai: 'da_hen',
                ghiChu: 'Chuẩn bị trình bày về một case study marketing'
            }
        ]);

        console.log(`Created ${interviews.length} interviews`);

        // ==================== CREATE NOTIFICATIONS ====================
        console.log('Creating notifications...');

        const notifications = await Notification.create([
            // For recruiter: new application from student1 to job0
            {
                nguoiNhan: recruiter1._id,
                tieuDe: 'Ứng tuyển mới cho vị trí Senior Full-stack Developer',
                noiDung: 'Ứng viên Trần Minh Anh đã nộp đơn ứng tuyển cho tin tuyển dụng của bạn.',
                loai: 'ung_tuyen_moi',
                lienKet: `/applications/${applications[0]._id}`,
                daDoc: false,
                duLieuBoSung: {
                    applicationId: applications[0]._id,
                    jobId: jobs[0]._id
                }
            },
            // For student1: invited to interview for job0
            {
                nguoiNhan: student1._id,
                tieuDe: 'Mời phỏng vấn cho vị trí Senior Full-stack Developer',
                noiDung: 'Bạn đã được mời phỏng vấn tại Tech Corp Vietnam. Thời gian: ' + interviews[0].thoiGianPhongVan.toLocaleString(),
                loai: 'moi_phong_van',
                lienKet: `/interviews/${interviews[0]._id}`,
                daDoc: false,
                duLieuBoSung: {
                    interviewId: interviews[0]._id
                }
            },
            // For recruiter: new application from student2 to job1
            {
                nguoiNhan: recruiter1._id,
                tieuDe: 'Ứng tuyển mới cho vị trí Frontend Developer Intern',
                noiDung: 'Ứng viên Nguyễn Thị Lan đã nộp đơn ứng tuyển cho tin tuyển dụng của bạn.',
                loai: 'ung_tuyen_moi',
                lienKet: `/applications/${applications[2]._id}`,
                daDoc: true,
                thoiGianDoc: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
                duLieuBoSung: {
                    applicationId: applications[2]._id,
                    jobId: jobs[1]._id
                }
            },
            // For student2: accepted for job1
            {
                nguoiNhan: student2._id,
                tieuDe: 'Chúc mừng! Bạn đã được nhận vào vị trí Frontend Developer Intern',
                noiDung: 'Chúc mừng bạn đã được nhận vào làm tại Tech Corp Vietnam. Vui lòng liên hệ để hoàn tất thủ tục.',
                loai: 'ket_qua_phong_van',
                lienKet: `/applications/${applications[2]._id}`,
                daDoc: false,
                duLieuBoSung: {
                    applicationId: applications[2]._id,
                    result: 'da_nhan'
                }
            },
            // For student2: rejected for job8
            {
                nguoiNhan: student2._id,
                tieuDe: 'Cập nhật trạng thái ứng tuyển Data Analyst',
                noiDung: 'Rất tiếc, đơn ứng tuyển của bạn cho vị trí Data Analyst tại E-Commerce Giant đã bị từ chối.',
                loai: 'thay_doi_trang_thai',
                lienKet: `/applications/${applications[3]._id}`,
                daDoc: true,
                thoiGianDoc: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                duLieuBoSung: {
                    applicationId: applications[3]._id,
                    newStatus: 'tu_choi'
                }
            },
            // System notification for admin
            {
                nguoiNhan: admin._id,
                tieuDe: 'Thông báo hệ thống: Cập nhật mới',
                noiDung: 'Hệ thống đã được cập nhật phiên bản mới với tính năng quản lý báo cáo.',
                loai: 'he_thong',
                daDoc: false
            }
        ]);

        console.log(`Created ${notifications.length} notifications`);

        // ==================== CREATE REPORTS ====================
        console.log('Creating reports...');

        const reports = await Report.create([
            {
                loaiBaoCao: 'thang',
                tuNgay: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                denNgay: new Date(),
                nguoiTao: giaoVu._id,
                thongKe: {
                    tongSoSinhVien: 5,
                    tongSoDoanhNghiep: 5,
                    tongSoTinTuyenDung: 10,
                    tongSoDonUngTuyen: 8,
                    tongSoPhongVan: 3,
                    tinTuyenDungTheoTrangThai: {
                        dangMoDon: 0,
                        choDuyet: 1,
                        daDuyet: 9,
                        daDong: 0
                    },
                    donUngTuyenTheoTrangThai: {
                        dangXemXet: 5,
                        duocMoiPhongVan: 2,
                        daNhan: 1,
                        tuChoi: 1
                    },
                    topDoanhNghiep: [
                        {
                            congTy: techCorp._id,
                            soLuongTin: 3,
                            soLuongUngVien: 4
                        },
                        {
                            congTy: innovate._id,
                            soLuongTin: 2,
                            soLuongUngVien: 2
                        },
                        {
                            congTy: digitalMKT._id,
                            soLuongTin: 2,
                            soLuongUngVien: 2
                        }
                    ],
                    topNganhNghe: [
                        {
                            nganhNghe: 'Công nghệ thông tin',
                            soLuongTin: 6
                        },
                        {
                            nganhNghe: 'Marketing',
                            soLuongTin: 2
                        },
                        {
                            nganhNghe: 'Phân tích dữ liệu',
                            soLuongTin: 1
                        }
                    ],
                    topKyNang: [
                        {
                            kyNang: 'React',
                            soLan: 4
                        },
                        {
                            kyNang: 'Node.js',
                            soLan: 3
                        },
                        {
                            kyNang: 'SEO',
                            soLan: 2
                        }
                    ]
                },
                fileBaoCao: {
                    tenFile: 'BaoCaoThang_10_2023.pdf',
                    duongDan: 'https://example.com/reports/monthly_oct_2023.pdf',
                    loaiFile: 'PDF'
                },
                trangThai: 'hoan_thanh'
            },
            {
                loaiBaoCao: 'quy',
                tuNgay: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
                denNgay: new Date(),
                nguoiTao: admin._id,
                thongKe: {
                    tongSoSinhVien: 5,
                    tongSoDoanhNghiep: 5,
                    tongSoTinTuyenDung: 10,
                    tongSoDonUngTuyen: 8,
                    tongSoPhongVan: 3,
                    tinTuyenDungTheoTrangThai: {
                        dangMoDon: 0,
                        choDuyet: 1,
                        daDuyet: 9,
                        daDong: 0
                    },
                    donUngTuyenTheoTrangThai: {
                        dangXemXet: 5,
                        duocMoiPhongVan: 2,
                        daNhan: 1,
                        tuChoi: 1
                    },
                    topDoanhNghiep: [
                        {
                            congTy: techCorp._id,
                            soLuongTin: 3,
                            soLuongUngVien: 4
                        },
                        {
                            congTy: eCommerce._id,
                            soLuongTin: 2,
                            soLuongUngVien: 1
                        }
                    ],
                    topNganhNghe: [
                        {
                            nganhNghe: 'Công nghệ thông tin',
                            soLuongTin: 7
                        },
                        {
                            nganhNghe: 'Marketing',
                            soLuongTin: 2
                        }
                    ],
                    topKyNang: [
                        {
                            kyNang: 'JavaScript',
                            soLan: 5
                        },
                        {
                            kyNang: 'React',
                            soLan: 4
                        }
                    ]
                },
                fileBaoCao: {
                    tenFile: 'BaoCaoQuy_4_2023.xlsx',
                    duongDan: 'https://example.com/reports/quarterly_q4_2023.xlsx',
                    loaiFile: 'Excel'
                },
                trangThai: 'hoan_thanh'
            }
        ]);

        console.log(`Created ${reports.length} reports`);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Run the seeder
connectDB().then(seedData);

