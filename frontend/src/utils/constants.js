export const ROLES = {
    STUDENT: 'student',
    ACADEMIC_STAFF: 'academic-staff',
    RECRUITER: 'recruiter',
    COMPANY_MANAGER: 'company-manager',
    ADMIN: 'admin'
};

export const ROLE_LABELS = {
    [ROLES.STUDENT]: 'Sinh viên',
    [ROLES.ACADEMIC_STAFF]: 'Giáo vụ',
    [ROLES.RECRUITER]: 'Nhân viên tuyển dụng',
    [ROLES.COMPANY_MANAGER]: 'Quản lý doanh nghiệp',
    [ROLES.ADMIN]: 'Quản trị hệ thống'
};

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        CHANGE_PASSWORD: '/auth/change-password',
        UPDATE_PROFILE: '/auth/update-profile'
    }
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    JOBS: '/jobs',
    APPLICATIONS: '/applications'
};