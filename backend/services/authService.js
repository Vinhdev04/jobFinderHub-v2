// ============================================
// backend/services/authService.js
// ============================================
const User = require('../models/User');

/**
 * Lấy thông tin user để trả về client (loại bỏ sensitive data)
 */
exports.getUserResponse = (user) => {
    return {
        id: user._id,
        hoVaTen: user.hoVaTen,
        email: user.email,
        soDienThoai: user.soDienThoai,
        vaiTro: user.vaiTro,
        anhDaiDien: user.anhDaiDien,
        trangThai: user.trangThai,
        thongTinSinhVien: user.thongTinSinhVien,
        congTy: user.congTy,
        createdAt: user.createdAt
    };
};

/**
 * Kiểm tra quyền truy cập resource
 */
exports.canAccessResource = (user, resourceOwnerId) => {
    // Admin có thể truy cập tất cả
    if (user.vaiTro === 'quan_tri_he_thong') {
        return true;
    }

    // User chỉ có thể truy cập resource của mình
    return user.id === resourceOwnerId.toString();
};

/**
 * Kiểm tra user có vai trò cụ thể
 */
exports.hasRole = (user, roles) => {
    if (Array.isArray(roles)) {
        return roles.includes(user.vaiTro);
    }
    return user.vaiTro === roles;
};
