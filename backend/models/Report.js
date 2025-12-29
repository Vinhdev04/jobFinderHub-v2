// backend/models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        // Loại báo cáo: 'tuan', 'thang', 'quy', 'nam'
        loaiBaoCao: {
            type: String,
            enum: ['tuan', 'thang', 'quy', 'nam'],
            required: true
        },

        // Thời gian báo cáo
        tuNgay: {
            type: Date,
            required: true
        },

        denNgay: {
            type: Date,
            required: true
        },

        // Người tạo báo cáo
        nguoiTao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Dữ liệu thống kê
        thongKe: {
            tongSoSinhVien: Number,
            tongSoDoanhNghiep: Number,
            tongSoTinTuyenDung: Number,
            tongSoDonUngTuyen: Number,
            tongSoPhongVan: Number,

            // Phân loại theo trạng thái
            tinTuyenDungTheoTrangThai: {
                dangMoDon: Number,
                choDuyet: Number,
                daDuyet: Number,
                daDong: Number
            },

            donUngTuyenTheoTrangThai: {
                dangXemXet: Number,
                duocMoiPhongVan: Number,
                daNhan: Number,
                tuChoi: Number
            },

            // Top doanh nghiệp
            topDoanhNghiep: [
                {
                    congTy: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Company'
                    },
                    soLuongTin: Number,
                    soLuongUngVien: Number
                }
            ],

            // Top ngành nghề
            topNganhNghe: [
                {
                    nganhNghe: String,
                    soLuongTin: Number
                }
            ],

            // Top kỹ năng
            topKyNang: [
                {
                    kyNang: String,
                    soLan: Number
                }
            ]
        },

        // File báo cáo xuất ra
        fileBaoCao: {
            tenFile: String,
            duongDan: String,
            loaiFile: {
                type: String,
                enum: ['PDF', 'Excel']
            }
        },

        // Trạng thái
        trangThai: {
            type: String,
            enum: ['dang_xu_ly', 'hoan_thanh'],
            default: 'dang_xu_ly'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Report', reportSchema);
