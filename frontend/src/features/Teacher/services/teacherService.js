// services/adminService.js

class TeacherService {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    }

    // Helper method for API calls
    async fetchAPI(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Dashboard stats
    async getStats() {
        return {
            total_students: 156,
            active_interns: 45,
            pending_reports: 12,
            partner_companies: 28
        };
    }

    // Interns list
    async getInterns() {
        return [
            {
                id: 'SV001',
                name: 'Nguyễn Văn A',
                avatar: '👨',
                company: 'FPT Software',
                position: 'Frontend Developer',
                progress: 65,
                startDate: '01/01/2024',
                status: 'Đang thực tập'
            },
            {
                id: 'SV002',
                name: 'Trần Thị B',
                avatar: '👩',
                company: 'VNG Corporation',
                position: 'Marketing Digital',
                progress: 85,
                startDate: '15/12/2023',
                status: 'Đang thực tập'
            }
        ];
    }

    // Reports list
    async getReports() {
        return [
            {
                id: 1,
                title: 'Báo cáo tuần 4 - Tháng 1/2024',
                author: 'Nguyễn Văn A (SV001)',
                date: '15/01/2024',
                status: 'pending'
            },
            {
                id: 2,
                title: 'Báo cáo tuần 4 - Tháng 1/2024',
                author: 'Trần Thị B (SV002)',
                date: '14/01/2024',
                status: 'pending'
            }
        ];
    }

    // Companies list
    async getCompanies() {
        return [
            {
                id: 1,
                name: 'FPT Software',
                interns: 23,
                icon: '💼',
                color: '#0ea5e9'
            },
            {
                id: 2,
                name: 'VNG Corporation',
                interns: 18,
                icon: '🎮',
                color: '#f97316'
            },
            {
                id: 3,
                name: 'Tiki Corporation',
                interns: 15,
                icon: '🛒',
                color: '#a855f7'
            }
        ];
    }

    // Pending jobs
    async getPendingJobs() {
        return [
            {
                id: 1,
                company: 'Shopee Vietnam',
                position: 'Data Analyst Intern',
                locations: '3 vị trí',
                date: '16/01/2024',
                status: 'pending'
            },
            {
                id: 2,
                company: 'Grab Vietnam',
                position: 'Mobile Developer Intern',
                locations: '2 vị trí',
                date: '15/01/2024',
                status: 'pending'
            }
        ];
    }

    // Actions
    async approveReport(reportId) {
        return {
            success: true,
            message: 'Báo cáo đã được phê duyệt',
            reportId
        };
    }

    async rejectReport(reportId, reason) {
        return {
            success: true,
            message: 'Báo cáo đã bị từ chối',
            reportId,
            reason
        };
    }

    async approveJob(jobId) {
        return {
            success: true,
            message: 'Tin tuyển dụng đã được phê duyệt',
            jobId
        };
    }

    async rejectJob(jobId, reason) {
        return {
            success: true,
            message: 'Tin tuyển dụng đã bị từ chối',
            jobId,
            reason
        };
    }

    async exportReport() {
        return {
            success: true,
            fileUrl: '/exports/report.xlsx'
        };
    }
}

// ✅ Export instance (KHÔNG trùng tên)
const teacherService = new TeacherService();
export default teacherService;
