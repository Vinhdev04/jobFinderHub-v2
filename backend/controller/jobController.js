// backend/controllers/jobController.js
const JobPosting = require('../models/JobPosting');
const JobDetail = require('../models/JobDetail');

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

        if (search) {
            filter.$or = [
                { tieuDe: { $regex: search, $options: 'i' } },
                { moTaCongViec: { $regex: search, $options: 'i' } }
            ];
        }

        const jobs = await JobPosting.find(filter)
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
            { $inc: { soLuotXem: 1 } },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài đăng'
            });
        }

        let jobDetail = null;
        try {
            jobDetail = await JobDetail.findOne({ job: job._id });
        } catch (err) {
            console.error('❌ JobDetail lookup error:', err.message);
        }

        const jobObj = job.toObject ? job.toObject() : job;
        jobObj.chiTiet = jobDetail || null;

        if (req.user && req.user.id) {
            try {
                const Application = require('../models/Application');
                const existingApp = await Application.findOne({ 
                    tinTuyenDung: job._id, 
                    ungVien: req.user.id 
                });
                jobObj._alreadyApplied = !!existingApp;
            } catch (err) {
                console.error('❌ Check existing application error:', err.message);
            }
        }

        return res.status(200).json({ success: true, data: jobObj });

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
            moTa,              // From frontend
            moTaCongViec,      // Alternative
            yeuCau,
            quyenLoi,
            kyNangYeuCau,
            loaiCongViec,
            mucLuong,
            diaDiem,
            soLuongTuyen,
            hanNop,            // From frontend
            hanNopHoSo,        // Alternative
            linhVuc,           // From frontend
            nganhNghe,         // Alternative
            trangThai,
            viTri,
            congTy
        } = req.body;

        console.log('📝 Create job request body:', req.body);

        // Map frontend fields to backend fields
        const jobData = {
            tieuDe: tieuDe || '',
            viTri: viTri || tieuDe || 'Vị trí tuyển dụng',
            moTaCongViec: moTa || moTaCongViec || '',
            yeuCau: yeuCau || '',
            quyenLoi: quyenLoi || '',
            kyNangYeuCau: kyNangYeuCau || [],
            loaiCongViec: loaiCongViec || 'toan_thoi_gian',
            diaDiem: diaDiem || '',
            soLuongTuyen: soLuongTuyen || 1,
            hanNopHoSo: hanNop || hanNopHoSo || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            nganhNghe: linhVuc || nganhNghe || '',
            nguoiTao: req.user.id,
            trangThai: trangThai || 'cho_duyet'
        };

        // Handle mucLuong - can be string or object
        if (mucLuong) {
            if (typeof mucLuong === 'string') {
                jobData.mucLuong = {
                    min: 0,
                    max: 0,
                    donVi: 'VND',
                    hienThi: true
                };
            } else if (typeof mucLuong === 'object') {
                jobData.mucLuong = mucLuong;
            }
        }

        // Get company from user if not provided
        if (congTy) {
            jobData.congTy = congTy;
        } else if (req.user.company) {
            jobData.congTy = req.user.company;
        } else if (req.user.congTy) {
            jobData.congTy = req.user.congTy;
        } else {
            // Try to find company where user is member
            const Company = require('../models/Company');
            const userCompany = await Company.findOne({ 
                $or: [
                    { nguoiDaiDien: req.user.id },
                    { 'thanhVien': req.user.id }
                ]
            });
            
            if (userCompany) {
                jobData.congTy = userCompany._id;
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Không tìm thấy công ty của bạn. Vui lòng tạo công ty trước.'
                });
            }
        }

        // Validate required fields
        if (!jobData.tieuDe || !jobData.congTy) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc (tiêu đề, công ty)'
            });
        }

        const job = await JobPosting.create(jobData);

        return res.status(201).json({
            success: true,
            message: 'Tạo bài đăng thành công',
            data: job
        });

    } catch (error) {
        console.error('❌ CreateJob error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi khi tạo tin tuyển dụng'
        });
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
            moTa,
            moTaCongViec,
            yeuCau,
            quyenLoi,
            kyNangYeuCau,
            loaiCongViec,
            mucLuong,
            diaDiem,
            soLuongTuyen,
            hanNop,
            hanNopHoSo,
            linhVuc,
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

        // Kiểm tra quyền - allow if user is creator OR admin OR has same company
        const hasPermission = 
            job.nguoiTao.toString() === req.user.id || 
            req.user.vaiTro === 'quan_tri_he_thong' ||
            req.user.vaiTro === 'admin' ||
            (req.user.company && job.congTy.toString() === req.user.company.toString());

        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền cập nhật bài đăng này'
            });
        }

        // Cập nhật thông tin
        if (tieuDe) job.tieuDe = tieuDe;
        if (viTri) job.viTri = viTri;
        if (moTa || moTaCongViec) job.moTaCongViec = moTa || moTaCongViec;
        if (yeuCau) job.yeuCau = yeuCau;
        if (quyenLoi) job.quyenLoi = quyenLoi;
        if (kyNangYeuCau) job.kyNangYeuCau = kyNangYeuCau;
        if (loaiCongViec) job.loaiCongViec = loaiCongViec;
        if (diaDiem) job.diaDiem = diaDiem;
        if (soLuongTuyen) job.soLuongTuyen = soLuongTuyen;
        if (hanNop || hanNopHoSo) job.hanNopHoSo = hanNop || hanNopHoSo;
        if (linhVuc || nganhNghe) job.nganhNghe = linhVuc || nganhNghe;

        // Handle mucLuong
        if (mucLuong) {
            if (typeof mucLuong === 'string') {
                job.mucLuong = {
                    min: 0,
                    max: 0,
                    donVi: 'VND',
                    hienThi: true
                };
            } else {
                job.mucLuong = mucLuong;
            }
        }

        // Chỉ admin mới có thể thay đổi trạng thái
        if (trangThai && (req.user.vaiTro === 'quan_tri_he_thong' || req.user.vaiTro === 'admin')) {
            job.trangThai = trangThai;
        }

        await job.save();

        return res.status(200).json({
            success: true,
            message: 'Cập nhật bài đăng thành công',
            data: job
        });

    } catch (error) {
        console.error('❌ UpdateJob error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi khi cập nhật tin tuyển dụng'
        });
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
        const hasPermission = 
            job.nguoiTao.toString() === req.user.id || 
            req.user.vaiTro === 'quan_tri_he_thong' ||
            req.user.vaiTro === 'admin';

        if (!hasPermission) {
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

/**
 * @desc    Create or update job detail for a job
 * @route   POST /api/jobs/:id/detail
 * @access  Private (Recruiter/Admin)
 */
exports.upsertJobDetail = async (req, res, next) => {
    try {
        const jobId = req.params.id;

        const job = await JobPosting.findById(jobId);
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: 'Không tìm thấy bài đăng' 
            });
        }

        const hasPermission = 
            req.user.vaiTro === 'quan_tri_he_thong' || 
            req.user.vaiTro === 'admin' ||
            job.nguoiTao.toString() === req.user.id;

        if (!hasPermission) {
            return res.status(403).json({ 
                success: false, 
                message: 'Bạn không có quyền cập nhật chi tiết này' 
            });
        }

        const {
            moTaChiTiet,
            nhiemVu,
            yeuCauChiTiet,
            kyNang,
            loiIch,
            huongDanUngTuyen,
            attachments
        } = req.body;

        const payload = {
            job: jobId,
            moTaChiTiet: moTaChiTiet || '',
            nhiemVu: Array.isArray(nhiemVu) ? nhiemVu : (nhiemVu ? [nhiemVu] : []),
            yeuCauChiTiet: yeuCauChiTiet || '',
            kyNang: Array.isArray(kyNang) ? kyNang : (kyNang ? [kyNang] : []),
            loiIch: loiIch || '',
            huongDanUngTuyen: huongDanUngTuyen || '',
            attachments: Array.isArray(attachments) ? attachments : []
        };

        let detail = await JobDetail.findOne({ job: jobId });
        if (detail) {
            Object.assign(detail, payload);
            await detail.save();
        } else {
            detail = await JobDetail.create(payload);
        }

        return res.status(200).json({ success: true, data: detail });

    } catch (error) {
        console.error('❌ UpsertJobDetail error:', error);
        next(error);
    }
};