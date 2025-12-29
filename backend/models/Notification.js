// backend/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        nguoiNhan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        tieuDe: {
            type: String,
            required: true
        },

        noiDung: {
            type: String,
            required: true
        },

        // Loại thông báo
        loai: {
            type: String,
            enum: [
                'ung_tuyen_moi',
                'moi_phong_van',
                'thay_doi_trang_thai',
                'tin_tuyen_dung_moi',
                'ket_qua_phong_van',
                'he_thong'
            ],
            required: true
        },

        // Link liên quan
        lienKet: {
            type: String
        },

        // Trạng thái đọc
        daDoc: {
            type: Boolean,
            default: false
        },

        // Thời gian đọc
        thoiGianDoc: {
            type: Date
        },

        // Dữ liệu bổ sung
        duLieuBoSung: {
            type: mongoose.Schema.Types.Mixed
        }
    },
    {
        timestamps: true
    }
);

// Index để query nhanh
notificationSchema.index({ nguoiNhan: 1, daDoc: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
