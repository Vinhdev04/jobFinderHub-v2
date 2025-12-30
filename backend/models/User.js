// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        hoVaTen: {
            type: String,
            required: [true, 'Vui lòng nhập họ và tên'],
            trim: true,
            minlength: [2, 'Họ và tên phải có ít nhất 2 ký tự'],
            maxlength: [100, 'Họ và tên không được quá 100 ký tự']
        },
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Email không hợp lệ']
        },
        matKhau: {
            type: String,
            required: [true, 'Vui lòng nhập mật khẩu'],
            minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
            select: false
        },
        soDienThoai: {
            type: String,
            required: [true, 'Vui lòng nhập số điện thoại'],
            match: [/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ']
        },
        vaiTro: {
            type: String,
            required: true,
            enum: {
                values: [
                    'sinh_vien',
                    'giao_vu',
                    'nhan_vien_tuyen_dung',
                    'quan_tri_he_thong',
                    'quan_ly_doanh_nghiep'
                ],
                message: 'Vai trò không hợp lệ'
            },
            default: 'sinh_vien',
            index: true
        },
        
        // Thông tin sinh viên
        thongTinSinhVien: {
            maSinhVien: {
                type: String,
                sparse: true,
                index: true
            },
            ngaySinh: Date,
            gioiTinh: {
                type: String,
                enum: ['nam', 'nu', 'khac']
            },
            diaChi: String,
            hocVan: [{
                truong: String,
                chuyenNganh: String,
                namBatDau: Number,
                namKetThuc: Number,
                gpa: {
                    type: Number,
                    min: 0,
                    max: 4
                }
            }],
            kyNang: [String],
            kinhNghiem: [{
                congTy: String,
                viTri: String,
                namBatDau: Number,
                namKetThuc: Number,
                moTa: String
            }],
            cv: {
                tenFile: String,
                duongDan: String,
                capNhatLuc: Date
            }
        },

        // Thông tin nhân viên tuyển dụng / Quản lý DN
        thongTinNhanVien: {
            tenCongTy: String,
            viTri: String,
            phongBan: String,
            ngayVaoLam: Date
        },

        // Thông tin giáo vụ
        thongTinGiaoVu: {
            maGiaoVu: {
                type: String,
                sparse: true
            },
            phongBan: String,
            chucVu: String
        },

        // Reference đến công ty (nếu có)
        congTy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },

        trangThai: {
            type: String,
            enum: ['hoat_dong', 'tam_khoa', 'khoa'],
            default: 'hoat_dong'
        },
        anhDaiDien: {
            type: String,
            default: null
        },
        ghiNhoDangNhap: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: String,
        emailVerificationExpire: Date
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// ============================================
// ✅ MIDDLEWARE - Hash mật khẩu (FIXED)
// ============================================
userSchema.pre('save', async function () {
    // Nếu mật khẩu không bị thay đổi thì bỏ qua
    if (!this.isModified('matKhau')) {
        return;
    }
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.matKhau = await bcrypt.hash(this.matKhau, salt);
    } catch (error) {
        // Nếu có lỗi, Mongoose sẽ tự bắt trong flow async
        throw new Error(error);
    }
});
// ============================================
// METHODS
// ============================================
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.matKhau);
};

userSchema.methods.createPasswordResetToken = function () {
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// ============================================
// VIRTUALS
// ============================================
userSchema.virtual('tenRutGon').get(function () {
    const names = this.hoVaTen.split(' ');
    return names[names.length - 1];
});

userSchema.virtual('laSinhVien').get(function () {
    return this.vaiTro === 'sinh_vien';
});

module.exports = mongoose.model('User', userSchema);