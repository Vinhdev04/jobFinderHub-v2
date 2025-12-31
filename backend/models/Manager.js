const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema(
    {
        hoVaTen: {
            type: String,
            required: [true, 'Vui lòng nhập họ và tên'],
            trim: true
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
        maNhanVien: {
            type: String,
            index: true,
            sparse: true
        },
        donVi: String,
        chucVu: String,
        ghiChu: String,
        trangThai: {
            type: String,
            enum: ['hoat_dong', 'tam_khoa', 'nghi_viec'],
            default: 'hoat_dong'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Manager', managerSchema);
