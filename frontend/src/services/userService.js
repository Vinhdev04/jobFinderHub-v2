// frontend/src/services/userService.js
import api from './api';

const userService = {
    /**
     * Lấy tất cả users với pagination và filters
     */
    getAllUsers: async (params = {}) => {
        try {
            const response = await api.get('/users', { params });
            // ✅ FIX: API trả về response trực tiếp, không cần .data
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Lấy thông tin user theo ID
     */
    getUserById: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Cập nhật thông tin user
     */
    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Xóa user
     */
    deleteUser: async (userId) => {
        try {
            const response = await api.delete(`/users/${userId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Khóa/Mở khóa user
     */
    toggleUserLock: async (userId) => {
        try {
            const response = await api.put(`/users/${userId}/lock`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Lấy thống kê users
     */
    getUserStats: async () => {
        try {
            const response = await api.get('/users/stats');
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;