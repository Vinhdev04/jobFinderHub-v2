// backend/controllers/reportController.js
const Report = require('../models/Report');
const User = require('../models/User');
const Company = require('../models/Company');
const JobPosting = require('../models/JobPosting');
const Application = require('../models/Application');
const Interview = require('../models/Interview');

/**
 * @desc    Lấy thống kê dashboard
 * @route   GET /api/reports/dashboard
 * @access  Private (Admin)
 */
exports.getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ loaiTaiKhoan: 'ung_vien' });
        const totalRecruiters = await User.countDocuments({ loaiTaiKhoan: 'nha_tuyen_dung' });
        const totalCompanies = await Company.countDocuments();
        const totalJobs = await JobPosting.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalInterviews = await Interview.countDocuments();

        // Đơn ứng tuyển theo trạng thái
        const applicationsByStatus = await Application.aggregate([
            {
                $group: {
                    _id: '$trangThai',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Bài đăng theo trạng thái
        const jobsByStatus = await JobPosting.aggregate([
            {
                $group: {
                    _id: '$trangThai',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Top 5 công ty có nhiều bài đăng nhất
        const topCompanies = await JobPosting.aggregate([
            {
                $group: {
                    _id: '$congTy',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'company'
                }
            }
        ]);

        // Top 5 ngành nghề
        const topFields = await JobPosting.aggregate([
            {
                $group: {
                    _id: '$nganhNghe',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalStudents,
                totalRecruiters,
                totalCompanies,
                totalJobs,
                totalApplications,
                totalInterviews,
                applicationsByStatus,
                jobsByStatus,
                topCompanies,
                topFields
            }
        });

    } catch (error) {
        console.error('❌ GetDashboardStats error:', error);
        next(error);
    }
};

/**
 * @desc    Tạo báo cáo
 * @route   POST /api/reports/generate
 * @access  Private (Admin)
 */
exports.generateReport = async (req, res, next) => {
    try {
        const { loaiBaoCao, tuNgay, denNgay } = req.body;

        if (!loaiBaoCao || !tuNgay || !denNgay) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin'
            });
        }

        // Lấy dữ liệu thống kê
        const tongSoSinhVien = await User.countDocuments({
            loaiTaiKhoan: 'ung_vien',
            createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
        });

        const tongSoDoanhNghiep = await Company.countDocuments({
            createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
        });

        const tongSoTinTuyenDung = await JobPosting.countDocuments({
            createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
        });

        const tongSoDonUngTuyen = await Application.countDocuments({
            ngayNop: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
        });

        const tongSoPhongVan = await Interview.countDocuments({
            createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
        });

        // Phân loại theo trạng thái
        const tinTuyenDungTheoTrangThai = await JobPosting.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
                }
            },
            {
                $group: {
                    _id: '$trangThai',
                    count: { $sum: 1 }
                }
            }
        ]);

        const donUngTuyenTheoTrangThai = await Application.aggregate([
            {
                $match: {
                    ngayNop: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
                }
            },
            {
                $group: {
                    _id: '$trangThai',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Top doanh nghiệp
        const topDoanhNghiep = await JobPosting.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
                }
            },
            {
                $group: {
                    _id: '$congTy',
                    soLuongTin: { $sum: 1 }
                }
            },
            {
                $sort: { soLuongTin: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'company'
                }
            }
        ]);

        // Top ngành nghề
        const topNganhNghe = await JobPosting.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
                }
            },
            {
                $group: {
                    _id: '$nganhNghe',
                    soLuongTin: { $sum: 1 }
                }
            },
            {
                $sort: { soLuongTin: -1 }
            },
            {
                $limit: 10
            }
        ]);

        // Top kỹ năng
        const topKyNang = await JobPosting.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(tuNgay), $lte: new Date(denNgay) }
                }
            },
            {
                $unwind: '$kyNangYeuCau'
            },
            {
                $group: {
                    _id: '$kyNangYeuCau',
                    soLan: { $sum: 1 }
                }
            },
            {
                $sort: { soLan: -1 }
            },
            {
                $limit: 10
            }
        ]);

        // Tạo báo cáo
        const report = await Report.create({
            loaiBaoCao,
            tuNgay,
            denNgay,
            nguoiTao: req.user.id,
            thongKe: {
                tongSoSinhVien,
                tongSoDoanhNghiep,
                tongSoTinTuyenDung,
                tongSoDonUngTuyen,
                tongSoPhongVan,
                tinTuyenDungTheoTrangThai: convertArrayToObject(tinTuyenDungTheoTrangThai),
                donUngTuyenTheoTrangThai: convertArrayToObject(donUngTuyenTheoTrangThai),
                topDoanhNghiep,
                topNganhNghe,
                topKyNang
            },
            trangThai: 'hoan_thanh'
        });

        return res.status(201).json({
            success: true,
            message: 'Tạo báo cáo thành công',
            data: report
        });

    } catch (error) {
        console.error('❌ GenerateReport error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy tất cả báo cáo
 * @route   GET /api/reports
 * @access  Private (Admin)
 */
exports.getReports = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const reports = await Report.find()
            .populate('nguoiTao', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Report.countDocuments();

        return res.status(200).json({
            success: true,
            data: reports,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetReports error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy báo cáo theo ID
 * @route   GET /api/reports/:id
 * @access  Private (Admin)
 */
exports.getReportById = async (req, res, next) => {
    try {
        const report = await Report.findById(req.params.id)
            .populate('nguoiTao', 'hoTen email');

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy báo cáo'
            });
        }

        return res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error('❌ GetReportById error:', error);
        next(error);
    }
};

/**
 * Helper function để convert array to object
 */
function convertArrayToObject(arr) {
    const obj = {};
    arr.forEach(item => {
        obj[item._id] = item.count;
    });
    return obj;
}