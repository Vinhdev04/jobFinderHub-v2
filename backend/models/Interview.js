// backend/models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  donUngTuyen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },

  ungVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  tinTuyenDung: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
    required: true
  },

  // Thời gian phỏng vấn
  thoiGianPhongVan: {
    type: Date,
    required: true
  },

  // Hình thức: 'truc_tuyen', 'truc_tiep'
  hinhThuc: {
    type: String,
    enum: ['truc_tuyen', 'truc_tiep'],
    required: true
  },

  // Địa điểm (nếu trực tiếp) hoặc link (nếu trực tuyến)
  diaDiem: {
    type: String,
    required: true
  },

  // Người phỏng vấn
  nguoiPhongVan: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Trạng thái: 'da_hen', 'dang_cho', 'hoan_thanh', 'huy'
  trangThai: {
    type: String,
    enum: ['da_hen', 'dang_cho', 'hoan_thanh', 'huy'],
    default: 'da_hen'
  },

  // Ghi chú
  ghiChu: {
    type: String
  },

  // Kết quả phỏng vấn
  ketQua: {
    danhGia: String,
    diem: {
      type: Number,
      min: 0,
      max: 10
    },
    nhanXet: String,

   

    quyetDinh: {
      type: String,
      enum: ['tuyen', 'khong_tuyen', 'can_phong_van_lai']
    }
  },

  // Nhắc nhở
  nhacNho: {
    daNhac: {
      type: Boolean,
      default: false
    },
    thoiGianNhac: Date
  }
}, {
  timestamps: true
});

// Index để tìm kiếm theo thời gian
interviewSchema.index({ thoiGianPhongVan: 1, trangThai: 1 });

module.exports = mongoose.model('Interview', interviewSchema);