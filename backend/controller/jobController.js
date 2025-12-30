// backend/controllers/jobController.js
const JobPosting = require('../models/JobPosting');

/**
 * @desc    Lấy tất cả bài đăng việc làm
 * @route   GET /api/jobs
 * @access  Public
 */
exports.getAllJobs = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            trangThai,
            nganhNghe,
            loaiCongViec,
            search
        } = req.query;

        const filter = {};

        if (trangThai) {
            filter.trangThai = trangThai;
        }

        if (nganhNghe) {
            filter.nganhNghe = nganhNghe;
        }

        if (loaiCongViec) {
            filter.loaiCongViec = loaiCongViec;
        }

        // Tìm kiếm theo tiêu đề hoặc mô tả
        if (search) {
            filter.$or = [
                { tieuDe: { $regex: search, $options: 'i' } },
                { moTaCongViec: { $regex: search, $options: 'i' } }
            ];
        }

        const jobs = await JobPosting.find(filter)
            .populate('congTy', 'tenCongTy logo diaChi')
            .populate('nguoiTao', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await JobPosting.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: jobs,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetAllJobs error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy bài đăng việc làm theo ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
exports.getJobById = async (req, res, next) => {
    try {
        const job = await JobPosting.findByIdAndUpdate(
            req.params.id,
            { $inc: { soLuotXem: 1 } }, // Tăng lượt xem
            { new: true }
        )
        .populate('congTy')
        .populate('nguoiTao', 'hoTen email');

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài đăng'
            });
        }

        return res.status(200).json({
            success: true,
            data: job
        });

    } catch (error) {
        console.error('❌ GetJobById error:', error);
        next(error);
    }
};

/**
 * @desc    Tạo bài đăng việc làm
 * @route   POST /api/jobs
 * @access  Private (Nhà tuyển dụng)
 */
exports.createJob = async (req, res, next) => {
    try {
        const {
            tieuDe,
            viTri,
            congTy,
            moTaCongViec,
            yeuCau,
            quyenLoi,
            kyNangYeuCau,
            loaiCongViec,
            mucLuong,
            diaDiem,
            soLuongTuyen,
            hanNopHoSo,
            nganhNghe
        } = req.body;

        // Validate required fields
        if (!tieuDe || !viTri || !congTy || !hanNopHoSo) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        const job = await JobPosting.create({
            tieuDe,
            viTri,
            congTy,
            moTaCongViec,
            yeuCau,
            quyenLoi,
            kyNangYeuCau: kyNangYeuCau || [],
            loaiCongViec,
            mucLuong,
            diaDiem,
            soLuongTuyen: soLuongTuyen || 1,
            hanNopHoSo,
            nganhNghe,
            nguoiTao: req.user.id,
            trangThai: 'cho_duyet'
        });

        const populatedJob = await job.populate('congTy').populate('nguoiTao', 'hoTen email');

        return res.status(201).json({
            success: true,
            message: 'Tạo bài đăng thành công',
            data: populatedJob
        });

    } catch (error) {
        console.error('❌ CreateJob error:', error);
        next(error);
    }
};

/**
 * @desc    Cập nhật bài đăng việc làm
 * @route   PUT /api/jobs/:id
 * @access  Private (Nhà tuyển dụng)
 */
exports.updateJob = async (req, res, next) => {
    try {
        const {
            tieuDe,
            viTri,
            moTaCongViec,
            yeuCau,
            quyenLoi,
            kyNangYeuCau,
            loaiCongViec,
            mucLuong,
            diaDiem,
            soLuongTuyen,
            hanNopHoSo,
            nganhNghe,
            trangThai
        } = req.body;

        let job = await JobPosting.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài đăng'
            });
        }

        // Kiểm tra quyền
        if (job.nguoiTao.toString() !== req.user.id && req.user.vaiTro !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền cập nhật bài đăng này'
            });
        }

        // Cập nhật thông tin
        if (tieuDe) job.tieuDe = tieuDe;
        if (viTri) job.viTri = viTri;
        if (moTaCongViec) job.moTaCongViec = moTaCongViec;
        if (yeuCau) job.yeuCau = yeuCau;
        if (quyenLoi) job.quyenLoi = quyenLoi;
        if (kyNangYeuCau) job.kyNangYeuCau = kyNangYeuCau;
        if (loaiCongViec) job.loaiCongViec = loaiCongViec;
        if (mucLuong) job.mucLuong = mucLuong;
        if (diaDiem) job.diaDiem = diaDiem;
        if (soLuongTuyen) job.soLuongTuyen = soLuongTuyen;
        if (hanNopHoSo) job.hanNopHoSo = hanNopHoSo;
        if (nganhNghe) job.nganhNghe = nganhNghe;

        // Chỉ admin mới có thể thay đổi trạng thái
        if (trangThai && req.user.vaiTro === 'admin') {
            job.trangThai = trangThai;
        }

        await job.save();

        const updatedJob = await job.populate('congTy').populate('nguoiTao', 'hoTen email');

        return res.status(200).json({
            success: true,
            message: 'Cập nhật bài đăng thành công',
            data: updatedJob
        });

    } catch (error) {
        console.error('❌ UpdateJob error:', error);
        next(error);
    }
};

/**
 * @desc    Xóa bài đăng việc làm
 * @route   DELETE /api/jobs/:id
 * @access  Private (Nhà tuyển dụng hoặc Admin)
 */
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await JobPosting.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài đăng'
            });
        }

        // Kiểm tra quyền
        if (job.nguoiTao.toString() !== req.user.id && req.user.vaiTro !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền xóa bài đăng này'
            });
        }

        await JobPosting.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Xóa bài đăng thành công'
        });

    } catch (error) {
        console.error('❌ DeleteJob error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy các bài đăng của công ty
 * @route   GET /api/jobs/company/:companyId
 * @access  Public
 */
exports.getJobsByCompany = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const jobs = await JobPosting.find({ congTy: req.params.companyId })
            .populate('congTy', 'tenCongTy logo')
            .populate('nguoiTao', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await JobPosting.countDocuments({ congTy: req.params.companyId });

        return res.status(200).json({
            success: true,
            data: jobs,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetJobsByCompany error:', error);
        next(error);
    }
};

/**
 * @desc    Phê duyệt bài đăng (Admin)
 * @route   PUT /api/jobs/:id/approve
 * @access  Private (Admin)
 */
exports.approveJob = async (req, res, next) => {
    try {
        const job = await JobPosting.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài đăng'
            });
        }

        job.trangThai = 'da_duyet';
        await job.save();

        return res.status(200).json({
            success: true,
            message: 'Phê duyệt bài đăng thành công',
            data: job
        });

    } catch (error) {
        console.error('❌ ApproveJob error:', error);
        next(error);
    }
};