import api from './api';

/**
 * Đăng ký tài khoản mới
 */
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
};

/**
 * Đăng nhập
 */
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    // Lưu token và user info vào localStorage
    if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
};

/**
 * Đăng xuất
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Lấy thông tin user hiện tại
 */
export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response;
};

/**
 * Quên mật khẩu
 */
export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
};

/**
 * Đặt lại mật khẩu
 */
export const resetPassword = async (token, password) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
        matKhau: password,
        xacNhanMatKhau: password
    });
    
    // Lưu token và user info mới
    if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
};

/**
 * Đổi mật khẩu
 */
export const changePassword = async (oldPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
        matKhauCu: oldPassword,
        matKhauMoi: newPassword
    });
    
    // Cập nhật token mới
    if (response.success && response.token) {
        localStorage.setItem('token', response.token);
    }
    
    return response;
};

/**
 * Cập nhật thông tin profile
 */
export const updateProfile = async (profileData) => {
    const response = await api.put('/auth/update-profile', profileData);
    
    // Cập nhật user info trong localStorage
    if (response.success && response.user) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response;
};

/**
 * Kiểm tra xem user đã đăng nhập chưa
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
};

/**
 * Lấy user từ localStorage
 */
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/**
 * Lấy token từ localStorage
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Map vai trò từ backend sang frontend
 */
export const mapRole = (vaiTro) => {
    const roleMap = {
        sinh_vien: 'student',
        giao_vu: 'academic-staff',
        nhan_vien_tuyen_dung: 'recruiter',
        quan_ly_doanh_nghiep: 'company-manager',
        quan_tri_he_thong: 'admin'
    };
    return roleMap[vaiTro] || vaiTro;
};

/**
 * Map vai trò từ frontend sang backend
 */
export const mapRoleToBackend = (role) => {
    const roleMap = {
        student: 'sinh_vien',
        'academic-staff': 'giao_vu',
        recruiter: 'nhan_vien_tuyen_dung',
        'company-manager': 'quan_ly_doanh_nghiep',
        admin: 'quan_tri_he_thong'
    };
    return roleMap[role] || role;
};

const authService = {
    register,
    login,
    logout,
    getMe,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    isAuthenticated,
    getCurrentUser,
    getToken,
    mapRole,
    mapRoleToBackend
};

export default authService;