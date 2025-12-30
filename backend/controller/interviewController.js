// backend/controllers/interviewController.js
const Interview = require('../models/Interview');
const Application = require('../models/Application');

/**
 * @desc    Lấy tất cả phỏng vấn
 * @route   GET /api/interviews
 * @access  Public
 */
exports.getAllInterviews = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, trangThai } = req.query;

        const filter = {};
        if (trangThai) {
            filter.trangThai = trangThai;
        }

        const interviews = await Interview.find(filter)
            .populate('donUngTuyen', 'id')
            .populate('ungVien', 'hoTen email soDienThoai')
            .populate('tinTuyenDung', 'tieuDe viTri')
            .populate('nguoiPhongVan', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ thoiGianPhongVan: -1 });

        const total = await Interview.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: interviews,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetAllInterviews error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy phỏng vấn theo ID
 * @route   GET /api/interviews/:id
 * @access  Public
 */
exports.getInterviewById = async (req, res, next) => {
    try {
        const interview = await Interview.findById(req.params.id)
            .populate('donUngTuyen')
            .populate('ungVien')
            .populate('tinTuyenDung')
            .populate('nguoiPhongVan', 'hoTen email');

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phỏng vấn'
            });
        }

        return res.status(200).json({
            success: true,
            data: interview
        });

    } catch (error) {
        console.error('❌ GetInterviewById error:', error);
        next(error);
    }
};

/**
 * @desc    Tạo lịch phỏng vấn
 * @route   POST /api/interviews
 * @access  Private (Nhà tuyển dụng)
 */
exports.createInterview = async (req, res, next) => {
    try {
        const {
            donUngTuyen,
            thoiGianPhongVan,
            hinhThuc,
            diaDiem,
            nguoiPhongVan,
            ghiChu
        } = req.body;

        // Validate required fields
        if (!donUngTuyen || !thoiGianPhongVan || !hinhThuc || !diaDiem) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        // Kiểm tra đơn ứng tuyển tồn tại
        const application = await Application.findById(donUngTuyen)
            .populate('tinTuyenDung')
            .populate('ungVien');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn ứng tuyển'
            });
        }

        // Tạo phỏng vấn
        const interview = await Interview.create({
            donUngTuyen,
            ungVien: application.ungVien._id,
            tinTuyenDung: application.tinTuyenDung._id,
            thoiGianPhongVan,
            hinhThuc,
            diaDiem,
            nguoiPhongVan: nguoiPhongVan || [req.user.id],
            ghiChu,
            trangThai: 'da_hen'
        });

        // Cập nhật trạng thái đơn ứng tuyển
        application.trangThai = 'duoc_moi_phong_van';
        application.lichSuTrangThai.push({
            trangThai: 'duoc_moi_phong_van',
            nguoiThayDoi: req.user.id,
            ghiChu: 'Được mời phỏng vấn'
        });
        await application.save();

        const populatedInterview = await interview
            .populate('donUngTuyen')
            .populate('ungVien')
            .populate('tinTuyenDung')
            .populate('nguoiPhongVan', 'hoTen email');

        return res.status(201).json({
            success: true,
            message: 'Tạo lịch phỏng vấn thành công',
            data: populatedInterview
        });

    } catch (error) {
        console.error('❌ CreateInterview error:', error);
        next(error);
    }
};

/**
 * @desc    Cập nhật phỏng vấn
 * @route   PUT /api/interviews/:id
 * @access  Private (Nhà tuyển dụng)
 */
exports.updateInterview = async (req, res, next) => {
    try {
        const {
            thoiGianPhongVan,
            diaDiem,
            nguoiPhongVan,
            ghiChu,
            trangThai
        } = req.body;

        let interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phỏng vấn'
            });
        }

        // Cập nhật thông tin
        if (thoiGianPhongVan) interview.thoiGianPhongVan = thoiGianPhongVan;
        if (diaDiem) interview.diaDiem = diaDiem;
        if (nguoiPhongVan) interview.nguoiPhongVan = nguoiPhongVan;
        if (ghiChu) interview.ghiChu = ghiChu;
        if (trangThai) interview.trangThai = trangThai;

        await interview.save();

        const updatedInterview = await interview
            .populate('donUngTuyen')
            .populate('ungVien')
            .populate('tinTuyenDung')
            .populate('nguoiPhongVan', 'hoTen email');

        return res.status(200).json({
            success: true,
            message: 'Cập nhật phỏng vấn thành công',
            data: updatedInterview
        });

    } catch (error) {
        console.error('❌ UpdateInterview error:', error);
        next(error);
    }
};

/**
 * @desc    Hủy phỏng vấn
 * @route   DELETE /api/interviews/:id
 * @access  Private (Nhà tuyển dụng)
 */
exports.cancelInterview = async (req, res, next) => {
    try {
        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phỏng vấn'
            });
        }

        interview.trangThai = 'huy';
        await interview.save();

        return res.status(200).json({
            success: true,
            message: 'Hủy phỏng vấn thành công'
        });

    } catch (error) {
        console.error('❌ CancelInterview error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy phỏng vấn của ứng viên
 * @route   GET /api/interviews/candidate/:studentId
 * @access  Private
 */
exports.getInterviewsByStudent = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const interviews = await Interview.find({ ungVien: req.params.studentId })
            .populate('donUngTuyen')
            .populate('tinTuyenDung', 'tieuDe viTri')
            .populate('nguoiPhongVan', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ thoiGianPhongVan: -1 });

        const total = await Interview.countDocuments({ ungVien: req.params.studentId });

        return res.status(200).json({
            success: true,
            data: interviews,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetInterviewsByStudent error:', error);
        next(error);
    }
};

/**
 * @desc    Hoàn thành phỏng vấn
 * @route   PUT /api/interviews/:id/complete
 * @access  Private (Nhà tuyển dụng)
 */
exports.completeInterview = async (req, res, next) => {
    try {
        const { danhGia, diem, nhanXet, quyetDinh } = req.body;

        let interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phỏng vấn'
            });
        }

        // Cập nhật kết quả phỏng vấn
        interview.ketQua = {
            danhGia,
            diem,
            nhanXet,
            quyetDinh
        };

        interview.trangThai = 'hoan_thanh';

        // Cập nhật trạng thái đơn ứng tuyển dựa vào quyết định
        const application = await Application.findById(interview.donUngTuyen);
        if (application) {
            if (quyetDinh === 'tuyen') {
                application.trangThai = 'da_nhan';
            } else if (quyetDinh === 'khong_tuyen') {
                application.trangThai = 'tu_choi';
            }
            // Nếu cần phỏng vấn lại, giữ trạng thái hiện tại

            application.danhGia = {
                diem,
                nhanXet,
                nguoiDanhGia: req.user.id,
                ngayDanhGia: new Date()
            };

            await application.save();
        }

        await interview.save();

        const updatedInterview = await interview
            .populate('donUngTuyen')
            .populate('ungVien')
            .populate('tinTuyenDung')
            .populate('nguoiPhongVan', 'hoTen email');

        return res.status(200).json({
            success: true,
            message: 'Hoàn thành phỏng vấn thành công',
            data: updatedInterview
        });

    } catch (error) {
        console.error('❌ CompleteInterview error:', error);
        next(error);
    }
};