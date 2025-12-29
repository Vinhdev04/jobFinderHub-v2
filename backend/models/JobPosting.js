// backend/models/JobPosting.js
const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema(
    {
        tieuDe: {
            type: String,
            required: true,
            trim: true
        },

        viTri: {
            type: String,
            required: true
        },

        congTy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },

        moTaCongViec: {
            type: String,
            required: true
        },

        yeuCau: {
            type: String,
            required: true
        },

        quyenLoi: {
            type: String,
            required: true
        },

        // Kỹ năng yêu cầu
        kyNangYeuCau: [
            {
                type: String
            }
        ],

        // Loại công việc: 'thuc_tap', 'toan_thoi_gian', 'ban_thoi_gian'
        loaiCongViec: {
            type: String,
            enum: ['thuc_tap', 'toan_thoi_gian', 'ban_thoi_gian'],
            required: true
        },

        // Mức lương
        mucLuong: {
            min: Number,
            max: Number,
            donVi: {
                type: String,
                enum: ['VND', 'USD'],
                default: 'VND'
            },
            hienThi: {
                type: Boolean,
                default: true
            }
        },

        diaDiem: {
            type: String,
            required: true
        },

        // Số lượng tuyển
        soLuongTuyen: {
            type: Number,
            required: true,
            default: 1
        },

        // Hạn nộp hồ sơ
        hanNopHoSo: {
            type: Date,
            required: true
        },

        // Trạng thái: 'dang_mo_don', 'cho_duyet', 'da_duyet', 'da_dong'
        trangThai: {
            type: String,
            enum: ['dang_mo_don', 'cho_duyet', 'da_duyet', 'da_dong'],
            default: 'cho_duyet'
        },

        // Thống kê
        soLuotXem: {
            type: Number,
            default: 0
        },

        soLuongUngTuyen: {
            type: Number,
            default: 0
        },

        // Người tạo tin
        nguoiTao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Ngành nghề
        nganhNghe: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Index để tìm kiếm nhanh hơn
jobPostingSchema.index({ tieuDe: 'text', moTaCongViec: 'text' });
jobPostingSchema.index({ trangThai: 1, hanNopHoSo: 1 });

module.exports = mongoose.model('JobPosting', jobPostingSchema);
