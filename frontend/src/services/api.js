/*
// Example axios setup
const API_URL = 'http://localhost:5000/api';

// Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

// Students
GET /api/users/profile
PUT /api/users/profile
POST /api/users/upload-cv

// Companies
GET /api/companies
GET /api/companies/:id
POST /api/companies (for recruiters)

// Jobs
GET /api/jobs?page=1&limit=10&search=frontend
GET /api/jobs/:id
POST /api/jobs (for recruiters)

// Applications
GET /api/applications/my-applications
POST /api/applications
PUT /api/applications/:id/withdraw

// Interviews
GET /api/interviews/my-interviews
GET /api/interviews/:id
*/
import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL:  import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - Thêm token vào header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Xử lý lỗi chung
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Network error
        if (!error.response) {
            return Promise.reject({
                message: 'Không thể kết nối đến server'
            });
        }

        // Server error
        const { status, data } = error.response;

        // Unauthorized - Token expired
        if (status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject({
                message: 'Phiên đăng nhập đã hết hạn'
            });
        }

        // Forbidden
        if (status === 403) {
            return Promise.reject({
                message: data.message || 'Bạn không có quyền truy cập'
            });
        }

        // Not found
        if (status === 404) {
            return Promise.reject({
                message: data.message || 'Không tìm thấy tài nguyên'
            });
        }

        // Validation error
        if (status === 400) {
            return Promise.reject({
                message: data.message || 'Dữ liệu không hợp lệ',
                errors: data.errors
            });
        }

        // Server error
        if (status >= 500) {
            return Promise.reject({
                message: 'Lỗi server. Vui lòng thử lại sau'
            });
        }

        return Promise.reject(data);
    }
);

export default api;
