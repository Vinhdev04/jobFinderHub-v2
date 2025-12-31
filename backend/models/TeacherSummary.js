const mongoose = require('mongoose');

const teacherSummarySchema = new mongoose.Schema(
    {
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            index: true
        },
        hoVaTen: String,
        email: String,
        maGiaoVien: String,
        boMon: String,
        chucVu: String,
        trangThai: {
            type: String,
            enum: ['hoat_dong', 'tam_khoa', 'nghi_viec'],
            default: 'hoat_dong'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('TeacherSummary', teacherSummarySchema);
