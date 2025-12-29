// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        tinTuyenDung: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPosting',
            required: true
        },

        ungVien: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Trạng thái: 'dang_xem_xet', 'duoc_moi_phong_van', 'da_nhan', 'tu_choi'
        trangThai: {
            type: String,
            enum: ['dang_xem_xet', 'duoc_moi_phong_van', 'da_nhan', 'tu_choi'],
            default: 'dang_xem_xet'
        },

        // CV đính kèm
        cvDinhKem: {
            tenFile: String,
            duongDan: String
        },

        // Thư giới thiệu
        thuGioiThieu: {
            type: String
        },

        // Ngày nộp
        ngayNop: {
            type: Date,
            default: Date.now
        },

        // Ghi chú từ nhà tuyển dụng
        ghiChuNhaTuyenDung: {
            type: String
        },

        // Điểm đánh giá
        danhGia: {
            diem: {
                type: Number,
                min: 0,
                max: 10
            },
            nhanXet: String,
            nguoiDanhGia: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            ngayDanhGia: Date
        },

        // Lịch sử thay đổi trạng thái
        lichSuTrangThai: [
            {
                trangThai: String,
                thoiGian: {
                    type: Date,
                    default: Date.now
                },
                nguoiThayDoi: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                ghiChu: String
            }
        ]
    },
    {
        timestamps: true
    }
);

// Đảm bảo mỗi người chỉ ứng tuyển 1 lần cho 1 tin
applicationSchema.index({ tinTuyenDung: 1, ungVien: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
