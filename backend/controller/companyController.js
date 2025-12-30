// backend/controllers/companyController.js
const Company = require('../models/Company');

/**
 * @desc    Lấy tất cả công ty
 * @route   GET /api/companies
 * @access  Public
 */
exports.getAllCompanies = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, trangThai } = req.query;
        
        const filter = {};
        if (trangThai) {
            filter.trangThai = trangThai;
        }

        const companies = await Company.find(filter)
            .populate('nguoiDaiDien', 'hoTen email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Company.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: companies,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetAllCompanies error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy công ty theo ID
 * @route   GET /api/companies/:id
 * @access  Public
 */
exports.getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id)
            .populate('nguoiDaiDien', 'hoTen email soDienThoai');

        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy công ty'
            });
        }

        return res.status(200).json({
            success: true,
            data: company
        });

    } catch (error) {
        console.error('❌ GetCompanyById error:', error);
        next(error);
    }
};

/**
 * @desc    Tạo công ty mới
 * @route   POST /api/companies
 * @access  Private (Nhà tuyển dụng)
 */
exports.createCompany = async (req, res, next) => {
    try {
        const {
            tenCongTy,
            moTa,
            diaChi,
            website,
            linhVuc,
            quyMo,
            email,
            soDienThoai
        } = req.body;

        // Kiểm tra công ty đã tồn tại
        const existingCompany = await Company.findOne({ tenCongTy });
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: 'Công ty đã tồn tại'
            });
        }

        // Tạo công ty
        const company = await Company.create({
            tenCongTy,
            moTa,
            diaChi,
            website,
            linhVuc,
            quyMo,
            email,
            soDienThoai,
            nguoiDaiDien: [req.user.id] // Người tạo là đại diện
        });

        return res.status(201).json({
            success: true,
            message: 'Tạo công ty thành công',
            data: company
        });

    } catch (error) {
        console.error('❌ CreateCompany error:', error);
        next(error);
    }
};

/**
 * @desc    Cập nhật công ty
 * @route   PUT /api/companies/:id
 * @access  Private (Nhà tuyển dụng của công ty)
 */
exports.updateCompany = async (req, res, next) => {
    try {
        const {
            tenCongTy,
            moTa,
            diaChi,
            website,
            linhVuc,
            quyMo,
            email,
            soDienThoai,
            trangThai
        } = req.body;

        let company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy công ty'
            });
        }

        // Kiểm tra quyền
        const isRepresentative = company.nguoiDaiDien.includes(req.user.id);
        if (!isRepresentative && req.user.vaiTro !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền cập nhật công ty này'
            });
        }

        // Cập nhật thông tin
        if (tenCongTy) company.tenCongTy = tenCongTy;
        if (moTa) company.moTa = moTa;
        if (diaChi) company.diaChi = diaChi;
        if (website) company.website = website;
        if (linhVuc) company.linhVuc = linhVuc;
        if (quyMo) company.quyMo = quyMo;
        if (email) company.email = email;
        if (soDienThoai) company.soDienThoai = soDienThoai;
        if (trangThai && req.user.vaiTro === 'admin') company.trangThai = trangThai;

        await company.save();

        return res.status(200).json({
            success: true,
            message: 'Cập nhật công ty thành công',
            data: company
        });

    } catch (error) {
        console.error('❌ UpdateCompany error:', error);
        next(error);
    }
};

/**
 * @desc    Xóa công ty
 * @route   DELETE /api/companies/:id
 * @access  Private (Admin)
 */
exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy công ty'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Xóa công ty thành công'
        });

    } catch (error) {
        console.error('❌ DeleteCompany error:', error);
        next(error);
    }
};

/**
 * @desc    Xác minh công ty (Admin)
 * @route   PUT /api/companies/:id/verify
 * @access  Private (Admin)
 */
exports.verifyCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy công ty'
            });
        }

        company.daXacMinh = true;
        await company.save();

        return res.status(200).json({
            success: true,
            message: 'Xác minh công ty thành công',
            data: company
        });

    } catch (error) {
        console.error('❌ VerifyCompany error:', error);
        next(error);
    }
};