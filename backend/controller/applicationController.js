// backend/controllers/applicationController.js
const Application = require('../models/Application');
const JobPosting = require('../models/JobPosting');
const Notification = require('../models/Notification');

/**
 * @desc    Lấy tất cả đơn ứng tuyển
 * @route   GET /api/applications
 * @access  Public
 */
exports.getAllApplications = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, trangThai } = req.query;

        const filter = {};
        if (trangThai) {
            filter.trangThai = trangThai;
        }

        const applications = await Application.find(filter)
            .populate('tinTuyenDung', 'tieuDe viTri')
            .populate('ungVien', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ ngayNop: -1 });

        const total = await Application.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: applications,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetAllApplications error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy đơn ứng tuyển theo ID
 * @route   GET /api/applications/:id
 * @access  Public
 */
exports.getApplicationById = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('tinTuyenDung')
            .populate('ungVien')
            .populate('danhGia.nguoiDanhGia', 'hoTen')
            .populate('lichSuTrangThai.nguoiThayDoi', 'hoTen');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn ứng tuyển'
            });
        }

        return res.status(200).json({
            success: true,
            data: application
        });

    } catch (error) {
        console.error('❌ GetApplicationById error:', error);
        next(error);
    }
};

/**
 * @desc    Tạo đơn ứng tuyển
 * @route   POST /api/applications
 * @access  Private (Ứng viên)
 */
exports.createApplication = async (req, res, next) => {
    try {
        const {
            tinTuyenDung,
            cvDinhKem,
            thuGioiThieu
        } = req.body;

        if (!tinTuyenDung) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng chọn bài đăng việc làm'
            });
        }

        // Kiểm tra bài đăng tồn tại
        const job = await JobPosting.findById(tinTuyenDung);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Bài đăng không tồn tại'
            });
        }

        // Kiểm tra đã ứng tuyển chưa
        const existingApplication = await Application.findOne({
            tinTuyenDung,
            ungVien: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'Bạn đã ứng tuyển bài đăng này rồi'
            });
        }

        // Tạo đơn ứng tuyển
        const application = await Application.create({
            tinTuyenDung,
            ungVien: req.user.id,
            cvDinhKem,
            thuGioiThieu,
            lichSuTrangThai: [{
                trangThai: 'dang_xem_xet',
                nguoiThayDoi: req.user.id
            }]
        });

        // Cập nhật số lượng ứng tuyển của bài đăng
        job.soLuongUngTuyen = (job.soLuongUngTuyen || 0) + 1;
        await job.save();

        const populatedApplication = await application
            .populate('tinTuyenDung')
            .populate('ungVien');

        // Gửi thông báo cho nhà tuyển dụng
        // (Sẽ implement sau khi có notification service)

        return res.status(201).json({
            success: true,
            message: 'Ứng tuyển thành công',
            data: populatedApplication
        });

    } catch (error) {
        console.error('❌ CreateApplication error:', error);
        next(error);
    }
};

/**
 * @desc    Cập nhật trạng thái đơn ứng tuyển
 * @route   PUT /api/applications/:id/status
 * @access  Private (Nhà tuyển dụng)
 */
exports.updateApplicationStatus = async (req, res, next) => {
    try {
        const { trangThai, ghiChu } = req.body;

        if (!trangThai) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng chọn trạng thái'
            });
        }

        let application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn ứng tuyển'
            });
        }

        // Cập nhật trạng thái
        application.trangThai = trangThai;
        if (ghiChu) {
            application.ghiChuNhaTuyenDung = ghiChu;
        }

        // Thêm vào lịch sử thay đổi
        application.lichSuTrangThai.push({
            trangThai,
            nguoiThayDoi: req.user.id,
            ghiChu
        });

        await application.save();

        const updatedApplication = await application
            .populate('tinTuyenDung')
            .populate('ungVien')
            .populate('lichSuTrangThai.nguoiThayDoi', 'hoTen');

        return res.status(200).json({
            success: true,
            message: 'Cập nhật trạng thái thành công',
            data: updatedApplication
        });

    } catch (error) {
        console.error('❌ UpdateApplicationStatus error:', error);
        next(error);
    }
};

/**
 * @desc    Rút hồ sơ ứng tuyển
 * @route   DELETE /api/applications/:id
 * @access  Private (Ứng viên)
 */
exports.withdrawApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn ứng tuyển'
            });
        }

        // Kiểm tra quyền
        if (application.ungVien.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền rút hồ sơ này'
            });
        }

        // Kiểm tra xem có thể rút không
        if (application.trangThai === 'da_nhan') {
            return res.status(400).json({
                success: false,
                message: 'Không thể rút hồ sơ vì đã được nhận'
            });
        }

        await Application.findByIdAndDelete(req.params.id);

        // Cập nhật số lượng ứng tuyển
        const job = await JobPosting.findById(application.tinTuyenDung);
        if (job) {
            job.soLuongUngTuyen = Math.max(0, (job.soLuongUngTuyen || 1) - 1);
            await job.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Rút hồ sơ thành công'
        });

    } catch (error) {
        console.error('❌ WithdrawApplication error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy đơn ứng tuyển của ứng viên
 * @route   GET /api/applications/candidate/:studentId
 * @access  Private
 */
exports.getApplicationsByStudent = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, trangThai } = req.query;

        const filter = { ungVien: req.params.studentId };
        if (trangThai) {
            filter.trangThai = trangThai;
        }

        const applications = await Application.find(filter)
            .populate('tinTuyenDung')
            .populate('ungVien', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ ngayNop: -1 });

        const total = await Application.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: applications,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetApplicationsByStudent error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy đơn ứng tuyển của bài đăng
 * @route   GET /api/applications/job/:jobId
 * @access  Private (Nhà tuyển dụng)
 */
exports.getApplicationsByJob = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, trangThai } = req.query;

        const filter = { tinTuyenDung: req.params.jobId };
        if (trangThai) {
            filter.trangThai = trangThai;
        }

        const applications = await Application.find(filter)
            .populate('ungVien', 'hoTen email soDienThoai')
            .populate('tinTuyenDung', 'tieuDe')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ ngayNop: -1 });

        const total = await Application.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: applications,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetApplicationsByJob error:', error);
        next(error);
    }
};