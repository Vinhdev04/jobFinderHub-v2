// backend/controllers/userController.js
const User = require('../models/User');
const authService = require('../services/authService');
const { AppError } = require('../middleware/errorHandler');
const sendEmail = require('../utils/sendEmail');
const path = require('path');
const fs = require('fs');

/**
 * @desc    Tạo user mới (Admin only)
 * @route   POST /api/users
 * @access  Private (Admin)
 */
exports.createUser = async (req, res, next) => {
    try {
        const { hoVaTen, email, matKhau, soDienThoai, vaiTro, trangThai } = req.body;

        if (!hoVaTen || !email) {
            return next(new AppError('Thiếu thông tin bắt buộc', 400));
        }

        // Check existing
        const existing = await User.findOne({ email });
        if (existing) {
            return next(new AppError('Email đã tồn tại', 400));
        }

        // If admin didn't provide a password, generate a temporary one
        const tempPassword = matKhau || Math.random().toString(36).slice(-8) + 'A1!';

        // Validate password strength (only check if admin provided one)
        const pwdCheck = authService.validatePasswordStrength(tempPassword);
        if (!pwdCheck.isStrong) {
            return next(new AppError(pwdCheck.message, 400));
        }

        const hashed = await authService.hashPassword(tempPassword);

        const userData = {
            hoVaTen,
            email,
            matKhau: hashed,
            soDienThoai: soDienThoai || '',
            vaiTro: vaiTro || 'sinh_vien',
            trangThai: trangThai || 'hoat_dong'
        };

        const user = await User.create(userData);

        // Send welcome email with temporary password asynchronously only if requested
        if (req.body.sendWelcome !== false) {
            setImmediate(async () => {
                try {
                    await sendEmail.sendWelcomeWithPassword(email, hoVaTen, tempPassword);
                    console.log('✅ Welcome email (with temp password) sent');
                } catch (emailErr) {
                    console.error('❌ Error sending welcome email:', emailErr.message);
                }
            });
        }

        const normalized = require('../services/authService').getUserResponse(user);
        return res.status(201).json({ success: true, message: 'Tạo người dùng thành công', data: normalized });
    } catch (error) {
        console.error('❌ CreateUser error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy tất cả users (Admin/Giáo vụ only)
 * @route   GET /api/users
 * @access  Private (Admin, Giáo vụ)
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            role = '',
            status = '',
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build query
        const query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                { hoVaTen: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by role
        if (role) {
            query.vaiTro = role;
        }

        // Filter by status
        if (status) {
            query.trangThai = status;
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get total count
        const total = await User.countDocuments(query);

        // Get users
        const users = await User.find(query)
            .select('-matKhau -resetPasswordToken -resetPasswordExpire')
            .populate('congTy', 'tenCongTy logo')
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(parseInt(limit));

        return res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit),
                    limit: parseInt(limit)
                }
            }
        });
    } catch (error) {
        console.error('❌ GetAllUsers error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy thông tin user theo ID
 * @route   GET /api/users/:id
 * @access  Private
 */
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-matKhau -resetPasswordToken')
            .populate('congTy', 'tenCongTy logo diaChi website');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        // Check permission: Admin/Giáo vụ hoặc chính user đó
        if (
            req.user.vaiTro !== 'quan_tri_he_thong' &&
            req.user.vaiTro !== 'giao_vu' &&
            req.user.id !== user.id
        ) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền xem thông tin này'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('❌ GetUserById error:', error);
        next(error);
    }
};

/**
 * @desc    Cập nhật user (Admin only)
 * @route   PUT /api/users/:id
 * @access  Private (Admin)
 */
exports.updateUser = async (req, res, next) => {
    try {
        const { hoVaTen, soDienThoai, vaiTro, trangThai } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        // Update fields
        if (hoVaTen) user.hoVaTen = hoVaTen;
        if (soDienThoai) user.soDienThoai = soDienThoai;
        if (vaiTro) user.vaiTro = vaiTro;
        if (trangThai) user.trangThai = trangThai;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin thành công',
            data: user
        });
    } catch (error) {
        console.error('❌ UpdateUser error:', error);
        next(error);
    }
};

/**
 * @desc    Xóa user (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        // Không cho phép xóa chính mình
        if (req.user.id === user.id) {
            return res.status(400).json({
                success: false,
                message: 'Không thể xóa tài khoản của chính bạn'
            });
        }

        await user.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Đã xóa người dùng thành công'
        });
    } catch (error) {
        console.error('❌ DeleteUser error:', error);
        next(error);
    }
};

/**
 * @desc    Khóa/Mở khóa user (Admin only)
 * @route   PUT /api/users/:id/lock
 * @access  Private (Admin)
 */
exports.toggleUserLock = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        // Không cho phép khóa chính mình
        if (req.user.id === user.id) {
            return res.status(400).json({
                success: false,
                message: 'Không thể khóa tài khoản của chính bạn'
            });
        }

        // Toggle status
        user.trangThai =
            user.trangThai === 'hoat_dong' ? 'tam_khoa' : 'hoat_dong';

        await user.save();

        return res.status(200).json({
            success: true,
            message: `Đã ${user.trangThai === 'tam_khoa' ? 'khóa' : 'mở khóa'} tài khoản`,
            data: user
        });
    } catch (error) {
        console.error('❌ ToggleUserLock error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy thống kê users
 * @route   GET /api/users/stats
 * @access  Private (Admin, Giáo vụ)
 */
exports.getUserStats = async (req, res, next) => {
    try {
        // Tổng số users
        const totalUsers = await User.countDocuments();

        // Users theo vai trò
        const usersByRole = await User.aggregate([
            {
                $group: {
                    _id: '$vaiTro',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Users theo trạng thái
        const usersByStatus = await User.aggregate([
            {
                $group: {
                    _id: '$trangThai',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Users đăng ký trong tháng này
        const startOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        );
        const newUsersThisMonth = await User.countDocuments({
            createdAt: { $gte: startOfMonth }
        });

        // Users hoạt động trong 7 ngày qua
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const activeUsers = await User.countDocuments({
            lastLogin: { $gte: sevenDaysAgo }
        });

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                usersByRole,
                usersByStatus,
                newUsersThisMonth,
                activeUsers
            }
        });
    } catch (error) {
        console.error('❌ GetUserStats error:', error);
        next(error);
    }
};

/**
 * @desc Upload avatar for current user
 * @route POST /api/users/upload-avatar
 * @access Private
 */
exports.uploadAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Không có file' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy user' });

        const relPath = `/uploads/avatars/${req.file.filename}`;
        // Save to schema field `anhDaiDien`
        user.anhDaiDien = relPath;
        await user.save();

        const normalized = require('../services/authService').getUserResponse(user);
        return res.status(200).json({ success: true, message: 'Cập nhật avatar thành công', user: normalized });
    } catch (err) {
        console.error('❌ UploadAvatar error:', err);
        next(err);
    }
};

/**
 * @desc Upload CV for current student
 * @route POST /api/users/upload-cv
 * @access Private (sinh_vien)
 */
exports.uploadCV = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'Không có file' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy user' });

        const relPath = `/uploads/cvs/${req.file.filename}`;
        if (!user.thongTinSinhVien) user.thongTinSinhVien = {};
        user.thongTinSinhVien.cv = {
            tenFile: req.file.originalname,
            duongDan: relPath,
            capNhatLuc: new Date()
        };

        await user.save();

        const normalized = require('../services/authService').getUserResponse(user);
        return res.status(200).json({ success: true, message: 'Cập nhật CV thành công', user: normalized });
    } catch (err) {
        console.error('❌ UploadCV error:', err);
        next(err);
    }
};