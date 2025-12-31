require('dotenv').config();
const connectDB = require('../config/database');
const Teacher = require('../models/Teacher');

async function seed() {
    try {
        await connectDB();
        console.log('Connected to DB');

        // sample teachers
        const samples = [
            {
                hoVaTen: 'Nguyễn Văn A',
                email: 'a.teacher@example.com',
                maGiaoVien: 'GV001',
                boMon: 'CNTT',
                chucVu: 'Giảng viên',
                trangThai: 'hoat_dong'
            },
            {
                hoVaTen: 'Trần Thị B',
                email: 'b.teacher@example.com',
                maGiaoVien: 'GV002',
                boMon: 'Toán',
                chucVu: 'Giảng viên',
                trangThai: 'hoat_dong'
            },
            {
                hoVaTen: 'Lê Văn C',
                email: 'c.teacher@example.com',
                maGiaoVien: 'GV003',
                boMon: 'Vật lý',
                chucVu: 'Giảng viên',
                trangThai: 'hoat_dong'
            },
            {
                hoVaTen: 'Phạm Thị D',
                email: 'd.teacher@example.com',
                maGiaoVien: 'GV004',
                boMon: 'Hóa',
                chucVu: 'Giảng viên',
                trangThai: 'hoat_dong'
            },
            {
                hoVaTen: 'Hoàng Văn E',
                email: 'e.teacher@example.com',
                maGiaoVien: 'GV005',
                boMon: 'Mạng',
                chucVu: 'Giảng viên',
                trangThai: 'tam_khoa'
            }
        ];

        // Optional: clear existing teachers in dev
        if (process.env.NODE_ENV !== 'production') {
            await Teacher.deleteMany({});
            console.log('Cleared Teacher collection');
        }

        const created = await Teacher.insertMany(samples);
        console.log(`Inserted ${created.length} teachers`);
        process.exit(0);
    } catch (err) {
        console.error('Seed failed', err);
        process.exit(1);
    }
}

seed();
