// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        // Thông tin cơ bản
        hoVaTen: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        matKhau: {
            type: String,
            required: true,
            minlength: 6
        },
        soDienThoai: {
            type: String,
            required: true
        },

        // Vai trò: 'sinh_vien', 'nhan_vien_tuyen_dung', 'quan_tri_he_thong', 'quan_ly_doanh_nghiep'
        vaiTro: {
            type: String,
            required: true,
            enum: [
                'sinh_vien',
                'giao_vu',
                'nhan_vien_tuyen_dung',
                'quan_tri_he_thong',
                'quan_ly_doanh_nghiep'
            ]
        },

        // Thông tin sinh viên (nếu vaiTro = 'sinh_vien')
        thongTinSinhVien: {
            maSinhVien: String,
            ngaySinh: Date,
            diaChi: String,

            // Học vấn
            hocVan: [
                {
                    truong: String,
                    chuyenNganh: String,
                    namBatDau: Number,
                    namKetThuc: Number,
                    gpa: Number
                }
            ],

            // Kỹ năng
            kyNang: [String],

            // CV
            cv: {
                tenFile: String,
                duongDan: String,
                capNhatLuc: Date
            }
        },

        // Thông tin công ty (nếu vaiTro liên quan đến doanh nghiệp)
        congTy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },

        // Trạng thái tài khoản
        trangThai: {
            type: String,
            enum: ['hoat_dong', 'tam_khoa', 'khoa'],
            default: 'hoat_dong'
        },

        // Avatar
        anhDaiDien: String,

        // Ghi nhớ đăng nhập
        ghiNhoDangNhap: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Hash mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('matKhau')) return next();
    this.matKhau = await bcrypt.hash(this.matKhau, 12);
    next();
});

// So sánh mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.matKhau);
};

module.exports = mongoose.model('User', userSchema);
