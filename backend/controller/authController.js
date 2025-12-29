// backend/controller/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Tạo JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Đăng ký người dùng mới
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { hoVaTen, email, matKhau, soDienThoai, vaiTro } = req.body;

        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Tạo user mới
        const user = await User.create({
            hoVaTen,
            email,
            matKhau,
            soDienThoai,
            vaiTro
        });

        // Tạo token
        const token = signToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            token,
            user: {
                id: user._id,
                hoVaTen: user.hoVaTen,
                email: user.email,
                vaiTro: user.vaiTro
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// @desc    Đăng nhập
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, matKhau, vaiTro } = req.body;

        // Validate
        if (!email || !matKhau) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập email và mật khẩu'
            });
        }

        // Tìm user
        const user = await User.findOne({ email, vaiTro }).select('+matKhau');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra mật khẩu
        const isPasswordCorrect = await user.comparePassword(matKhau);

        if (!isPasswordCorrect) {
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

        // Tạo token
        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user._id,
                hoVaTen: user.hoVaTen,
                email: user.email,
                vaiTro: user.vaiTro,
                anhDaiDien: user.anhDaiDien
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// @desc    Lấy thông tin user hiện tại
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('congTy')
            .select('-matKhau');

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};
