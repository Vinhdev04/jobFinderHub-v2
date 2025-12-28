// constants/adminConstants.js

export const TAB_IDS = {
    OVERVIEW: 'overview',
    STUDENTS: 'students',
    REPORTS: 'reports',
    COMPANIES: 'companies',
    APPROVAL: 'approval'
};

export const TABS_CONFIG = [
    {
        id: TAB_IDS.OVERVIEW,
        icon: '📊',
        label: 'Tổng quan',
        badge: null
    },
    {
        id: TAB_IDS.STUDENTS,
        icon: '👤',
        label: 'Sinh viên',
        badge: null
    },
    {
        id: TAB_IDS.REPORTS,
        icon: '📄',
        label: 'Báo cáo thực tập',
        badge: 'pending_reports' // Key để lấy số từ data
    },
    {
        id: TAB_IDS.COMPANIES,
        icon: '🏢',
        label: 'Doanh nghiệp',
        badge: null
    },
    {
        id: TAB_IDS.APPROVAL,
        icon: '✅',
        label: 'Phê duyệt tin',
        badge: 'pending_jobs' // Key để lấy số từ data
    }
];

export const STAT_TYPES = {
    TEAL: 'teal',
    BLUE: 'blue',
    ORANGE: 'orange',
    GREEN: 'green'
};

export const INTERN_STATUS = {
    ACTIVE: 'Đang thực tập',
    COMPLETED: 'Hoàn thành',
    PENDING: 'Chờ bắt đầu'
};

export const REPORT_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

export const JOB_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

export const API_ENDPOINTS = {
    STATS: '/api/admin/stats',
    INTERNS: '/api/admin/interns',
    REPORTS: '/api/admin/reports',
    COMPANIES: '/api/admin/companies',
    JOBS: '/api/admin/jobs',
    APPROVE_REPORT: '/api/admin/reports/:id/approve',
    REJECT_REPORT: '/api/admin/reports/:id/reject',
    APPROVE_JOB: '/api/admin/jobs/:id/approve',
    REJECT_JOB: '/api/admin/jobs/:id/reject'
};

export const QUICK_ACTIONS = [
    { id: 'export', icon: '📊', label: 'Xuất báo cáo' },
    { id: 'add-student', icon: '➕', label: 'Thêm sinh viên' },
    { id: 'manage-company', icon: '🏢', label: 'Quản lý DN' }
];
