// services/adminService.js

import api from '@services/api';

class TeacherService {
    constructor() {}

    // Dashboard stats
    async getStats() {
        try {
            const res = await api.get('/reports/dashboard');
            // api returns response.data by interceptor, which in backend is { success: true, data: { ... } }
            if (res && res.data) return res.data;
            if (res && res.success && res.data) return res.data;
            return res;
        } catch (err) {
            console.warn('getStats fallback to mock', err.message);
            return {
                total_students: 156,
                active_interns: 45,
                pending_reports: 12,
                partner_companies: 28
            };
        }
    }

    // Interns list
    async getInterns() {
        try {
            // Try to fetch students/interns from backend - best effort
            const res = await api.get('/users?role=ung_vien&limit=20&page=1');
            if (res && res.data && Array.isArray(res.data.users)) {
                return res.data.users.map((u) => ({
                    id: u._id || u.id,
                    name: u.hoVaTen || u.name || u.email,
                    avatar: u.anhDaiDien || '👤',
                    company:
                        u.congTy && (u.congTy.tenCongTy || u.congTy.name)
                            ? u.congTy.tenCongTy || u.congTy.name
                            : u.congTy || '',
                    position:
                        (u.thongTinSinhVien &&
                            u.thongTinSinhVien.chuyenNganh) ||
                        '',
                    progress:
                        (u.thongTinSinhVien && u.thongTinSinhVien.tienDo) || 0,
                    startDate: u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : '',
                    status: u.trangThai || 'Đang thực tập'
                }));
            }
            if (Array.isArray(res)) return res;
            // fallback to mock
        } catch (err) {
            console.warn('getInterns API failed, using mock', err.message);
        }

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
        try {
            const res = await api.get('/reports?limit=50&page=1');
            if (res && res.data) return res.data;
            if (Array.isArray(res)) return res;
        } catch (err) {
            console.warn('getReports API failed, using mock', err.message);
        }
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
        try {
            const res = await api.get('/companies?limit=20&page=1');
            if (res && res.data) return res.data;
            if (Array.isArray(res)) return res;
        } catch (err) {
            console.warn('getCompanies API failed, using mock', err.message);
        }
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
        try {
            const res = await api.get('/jobs?limit=50&page=1');
            const list =
                res && res.data && Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res)
                    ? res
                    : res && res.data && res.data.data
                    ? res.data.data
                    : [];
            // filter pending
            return (list || []).filter(
                (j) => (j.trangThai || j.status || j.state) === 'pending'
            );
        } catch (err) {
            console.warn('getPendingJobs API failed, using mock', err.message);
        }
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
        try {
            const res = await api.put(`/reports/${reportId}/approve`);
            return res;
        } catch (err) {
            console.warn('approveReport API failed', err.message);
            return { success: false, message: 'Không thể phê duyệt báo cáo' };
        }
    }

    async rejectReport(reportId, reason) {
        try {
            const res = await api.put(`/reports/${reportId}/reject`, {
                reason
            });
            return res;
        } catch (err) {
            console.warn('rejectReport API failed', err.message);
            return { success: false, message: 'Không thể từ chối báo cáo' };
        }
    }

    async approveJob(jobId) {
        try {
            const res = await api.put(`/jobs/${jobId}/approve`);
            return res;
        } catch (err) {
            console.warn('approveJob API failed', err.message);
            return { success: false, message: 'Không thể phê duyệt tin' };
        }
    }

    async rejectJob(jobId, reason) {
        try {
            const res = await api.put(`/jobs/${jobId}/reject`, { reason });
            return res;
        } catch (err) {
            console.warn('rejectJob API failed', err.message);
            return { success: false, message: 'Không thể từ chối tin' };
        }
    }

    async exportReport(type = 'dashboard', opts = {}) {
        try {
            const res = await api.post('/reports/generate', {
                loaiBaoCao: type,
                tuNgay: opts.tuNgay || new Date().toISOString(),
                denNgay: opts.denNgay || new Date().toISOString()
            });
            return res;
        } catch (err) {
            console.warn('exportReport API failed', err.message);
            return { success: true, fileUrl: '/exports/report.xlsx' };
        }
    }
}

// ✅ Export instance (KHÔNG trùng tên)
const teacherService = new TeacherService();
export default teacherService;
