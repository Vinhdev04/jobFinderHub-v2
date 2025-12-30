// src/services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Bỏ fallback, set trực tiếp có /api

const jobService = {
    getAllJobs: async (params = {}) => {
        try {
            const fullUrl = `${API_URL}/jobs`;  // Full URL: http://localhost:5000/api/jobs
            console.log(`🔗 Calling API URL: ${fullUrl}`);  // Log để check trong console browser
            const response = await axios.get(fullUrl, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    },

    /**aa
     * Lấy chi tiết công việc theo ID
     */
    getJobById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/jobs/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching job details:', error);
            throw error;
        }
    },

    /**
     * Lấy danh sách công việc theo công ty
     */
    getJobsByCompany: async (companyId, params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/jobs/company/${companyId}`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching company jobs:', error);
            throw error;
        }
    },

    /**
     * Tạo bài đăng công việc mới (Nhà tuyển dụng)
     */
    createJob: async (jobData, token) => {
        try {
            const response = await axios.post(`${API_URL}/jobs`, jobData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    },

    /**
     * Cập nhật bài đăng công việc
     */
    updateJob: async (id, jobData, token) => {
        try {
            const response = await axios.put(`${API_URL}/jobs/${id}`, jobData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating job:', error);
            throw error;
        }
    },

    /**
     * Xóa bài đăng công việc
     */
    deleteJob: async (id, token) => {
        try {
            const response = await axios.delete(`${API_URL}/jobs/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting job:', error);
            throw error;
        }
    },

    /**
     * Phê duyệt bài đăng (Admin)
     */
    approveJob: async (id, token) => {
        try {
            const response = await axios.put(`${API_URL}/jobs/${id}/approve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error approving job:', error);
            throw error;
        }
    }
};

export default jobService;