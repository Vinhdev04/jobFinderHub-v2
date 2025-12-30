// backend/controllers/authController.js
const User = require('../models/User');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

/**
 * @desc    Đăng ký người dùng mới
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
    try {
        const { hoVaTen, email, matKhau, soDienThoai, vaiTro, maSinhVien } = req.body;

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Tạo user mới
        const userData = {
            hoVaTen,
            email,
            matKhau,
            soDienThoai,
            vaiTro: vaiTro || 'sinh_vien'
        };

        // Xử lý thông tin theo vai trò
        if (vaiTro === 'sinh_vien' && maSinhVien) {
            userData.thongTinSinhVien = {
                maSinhVien: req.body.maSinhVien
            };
        }

        if ((vaiTro === 'nhan_vien_tuyen_dung' || vaiTro === 'quan_ly_doanh_nghiep')) {
            userData.thongTinNhanVien = {
                tenCongTy: req.body.tenCongTy,
                viTri: req.body.viTri,
                phongBan: req.body.phongBan
            };
        }

        if (vaiTro === 'giao_vu') {
            userData.thongTinGiaoVu = {
                maGiaoVu: req.body.maGiaoVu,
                phongBan: req.body.phongBan,
                chucVu: req.body.chucVu
            };
        }

        const user = await User.create(userData);

        // Tạo token
        const token = tokenService.signToken(user._id);

        // ✅ Gửi email chào mừng KHÔNG ĐỒNG BỘ (không block response)
        // Sử dụng setImmediate để không block response
        setImmediate(async () => {
            try {
                await sendEmail.sendWelcomeEmail(user.email, user.hoVaTen);
                console.log('✅ Welcome email sent successfully');
            } catch (emailError) {
                console.error('❌ Error sending welcome email:', emailError.message);
                // Không throw error vì email không critical
            }
        });

        // ✅ RETURN để đảm bảo không tiếp tục execute
        return res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            token,
            user: authService.getUserResponse(user)
        });

    } catch (error) {
        console.error('❌ Register error:', error);
        // ✅ Pass error to error handler middleware
        next(error);
    }
};

/**
 * @desc    Đăng nhập
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
    try {
        const { email, matKhau, vaiTro } = req.body;

        // Validate
        if (!email || !matKhau) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập email và mật khẩu'
            });
        }

        // Tìm user và include password
        const query = { email };
        if (vaiTro) {
            query.vaiTro = vaiTro;
        }

        // Try to find user by email+role (if provided). If not found and a role was provided,
        // fall back to finding by email only so users aren't blocked by an incorrect role selection in the UI.
        let user = await User.findOne(query).select('+matKhau');
        if (!user && vaiTro) {
            user = await User.findOne({ email }).select('+matKhau');
        }

        if (!user) {
            // Log failed login attempt (no user found)
            try {
                const Activity = require('../models/Activity');
                await Activity.create({
                    action: 'Đăng nhập thất bại',
                    userEmail: email,
                    ip: req.ip,
                    status: 'error',
                    meta: { reason: 'user_not_found' }
                });
            } catch (logErr) {
                console.error('❌ Activity log error:', logErr.message);
            }

            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra mật khẩu
        const isPasswordCorrect = await user.comparePassword(matKhau);

        if (!isPasswordCorrect) {
            // Log failed login due to wrong password
            try {
                const Activity = require('../models/Activity');
                await Activity.create({
                    action: 'Đăng nhập thất bại',
                    user: user._id,
                    userEmail: user.email,
                    ip: req.ip,
                    status: 'error',
                    meta: { reason: 'wrong_password' }
                });
            } catch (logErr) {
                console.error('❌ Activity log error:', logErr.message);
            }

            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra trạng thái tài khoản
        if (user.trangThai !== 'hoat_dong') {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản đã bị khóa hoặc tạm khóa'
            });
        }

        // Cập nhật thời gian đăng nhập cuối
        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });

        // Log activity: successful login
        try {
            const Activity = require('../models/Activity');
            await Activity.create({
                action: 'Đăng nhập hệ thống',
                user: user._id,
                userEmail: user.email,
                ip: req.ip,
                status: 'success'
            });
        } catch (logErr) {
            console.error('❌ Activity log error:', logErr.message);
        }

        // Tạo token
        const token = tokenService.signToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: authService.getUserResponse(user)
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        next(error);
    }
};

/**
 * @desc    Lấy thông tin user hiện tại
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('congTy').select('-matKhau');
        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy user' });
        }

        const normalized = require('../services/authService').getUserResponse(user);
        return res.status(200).json({ success: true, user: normalized });

    } catch (error) {
        console.error('❌ GetMe error:', error);
        next(error);
    }
};

/**
 * @desc    Quên mật khẩu - Gửi email reset
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập email'
            });
        }

        // Tìm user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tài khoản với email này'
            });
        }

        // Tạo reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token và lưu vào database
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút

        await user.save({ validateBeforeSave: false });

        // Tạo URL reset
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Gửi email
        try {
            await sendEmail.sendPasswordResetEmail(user.email, user.hoVaTen, resetUrl);

            return res.status(200).json({
                success: true,
                message: 'Email hướng dẫn đặt lại mật khẩu đã được gửi'
            });

        } catch (emailError) {
            console.error('❌ Send email error:', emailError);
            
            // Nếu gửi email thất bại, xóa token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: 'Không thể gửi email. Vui lòng thử lại sau'
            });
        }

    } catch (error) {
        console.error('❌ ForgotPassword error:', error);
        next(error);
    }
};

/**
 * @desc    Đặt lại mật khẩu
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { matKhau } = req.body;

        if (!matKhau) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập mật khẩu mới'
            });
        }

        // Hash token để so sánh
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Tìm user với token hợp lệ
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }

        // Cập nhật mật khẩu mới
        user.matKhau = matKhau;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        // Tạo token mới để tự động đăng nhập
        const authToken = tokenService.signToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Đặt lại mật khẩu thành công',
            token: authToken,
            user: authService.getUserResponse(user)
        });

    } catch (error) {
        console.error('❌ ResetPassword error:', error);
        next(error);
    }
};

/**
 * @desc    Đổi mật khẩu
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
exports.changePassword = async (req, res, next) => {
    try {
        const { matKhauCu, matKhauMoi } = req.body;

        if (!matKhauCu || !matKhauMoi) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
        }

        // Lấy user với password
        const user = await User.findById(req.user.id).select('+matKhau');

        // Kiểm tra mật khẩu cũ
        const isMatch = await user.comparePassword(matKhauCu);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Mật khẩu cũ không đúng'
            });
        }

        // Cập nhật mật khẩu mới
        user.matKhau = matKhauMoi;
        await user.save();

        // Tạo token mới
        const token = tokenService.signToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Đổi mật khẩu thành công',
            token
        });

    } catch (error) {
        console.error('❌ ChangePassword error:', error);
        next(error);
    }
};

/**
 * @desc    Cập nhật thông tin profile
 * @route   PUT /api/auth/update-profile
 * @access  Private
 */
exports.updateProfile = async (req, res, next) => {
    try {
        const { hoVaTen, soDienThoai, diaChi, kyNang, hocVan } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy user'
            });
        }

        if (hoVaTen) user.hoVaTen = hoVaTen;
        if (soDienThoai) user.soDienThoai = soDienThoai;

        // Optional: persist skills and education into thongTinSinhVien
        if (!user.thongTinSinhVien) user.thongTinSinhVien = user.thongTinSinhVien || {};
        if (Array.isArray(kyNang)) {
            user.thongTinSinhVien.kyNang = kyNang;
        }
        if (Array.isArray(hocVan)) {
            user.thongTinSinhVien.hocVan = hocVan;
        }

        if (user.vaiTro === 'sinh_vien' && diaChi) {
            if (!user.thongTinSinhVien) {
                user.thongTinSinhVien = {};
            }
            user.thongTinSinhVien.diaChi = diaChi;
        }

        await user.save();

        const normalized = require('../services/authService').getUserResponse(user);
        return res.status(200).json({ success: true, message: 'Cập nhật thông tin thành công', user: normalized });

    } catch (error) {
        console.error('❌ UpdateProfile error:', error);
        next(error);
    }
};