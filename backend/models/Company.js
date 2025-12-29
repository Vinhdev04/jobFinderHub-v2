// backend/models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
    {
        tenCongTy: {
            type: String,
            required: true,
            trim: true
        },

        moTa: {
            type: String,
            required: true
        },

        logo: {
            type: String,
            default: ''
        },

        diaChi: {
            type: String,
            required: true
        },

        website: String,

        linhVuc: {
            type: String,
            required: true
        },

        quyMo: {
            type: String,
            enum: ['1-50', '51-200', '201-500', '501-1000', '1000+'],
            required: true
        },

        // Thông tin liên hệ
        email: {
            type: String,
            required: true
        },

        soDienThoai: {
            type: String,
            required: true
        },

        // Trạng thái xác minh
        daXacMinh: {
            type: Boolean,
            default: false
        },

        // Người đại diện
        nguoiDaiDien: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        // Thống kê
        thongKe: {
            soLuongTinTuyenDung: {
                type: Number,
                default: 0
            },
            soLuongUngVien: {
                type: Number,
                default: 0
            },
            soLuongDaTuyen: {
                type: Number,
                default: 0
            }
        },

        trangThai: {
            type: String,
            enum: ['hoat_dong', 'tam_dung'],
            default: 'hoat_dong'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Company', companySchema);
