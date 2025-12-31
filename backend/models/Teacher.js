const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        hoVaTen: {
            type: String,
            required: [true, 'Vui lòng nhập họ và tên'],
            trim: true,
            minlength: [2, 'Họ và tên phải có ít nhất 2 ký tự']
        },
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
        },
        soDienThoai: {
            type: String,
            match: [/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ']
        },
        maGiaoVien: {
            type: String,
            index: true,
            sparse: true
        },
        boMon: String,
        chucVu: String,
        ghiChu: String,
        trangThai: {
            type: String,
            enum: ['hoat_dong', 'tam_khoa', 'nghi_viec'],
            default: 'hoat_dong'
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

module.exports = mongoose.model('Teacher', teacherSchema);
