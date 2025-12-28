// src/constants/systemConstants.js

export const TABS = {
    OVERVIEW: 'overview',
    USERS: 'users',
    ORGANIZATIONS: 'organizations',
    SYSTEM_LOG: 'system_log',
    SETTINGS: 'settings',
    BACKUP: 'backup'
};

export const TAB_LABELS = {
    [TABS.OVERVIEW]: 'Tổng quan',
    [TABS.USERS]: 'Người dùng',
    [TABS.ORGANIZATIONS]: 'Tổ chức',
    [TABS.SYSTEM_LOG]: 'Nhật ký hệ thống',
    [TABS.SETTINGS]: 'Cài đặt',
    [TABS.BACKUP]: 'Sao lưu'
};

export const USER_ROLES = {
    STUDENT: 'Sinh viên',
    HR: 'Nhân viên HR',
    ADMIN: 'Quản trị viên'
};

export const USER_STATUS = {
    ACTIVE: 'Hoạt động',
    INACTIVE: 'Không hoạt động'
};

export const ORG_TYPES = {
    COMPANY: 'Doanh nghiệp',
    SCHOOL: 'Trường học'
};

export const ORG_STATUS = {
    ACTIVE: 'Hoạt động',
    INACTIVE: 'Không hoạt động'
};

export const ACTIVITY_TYPES = {
    LOGIN: 'Đăng nhập',
    CREATE_USER: 'Tạo người dùng',
    UPDATE_CONFIG: 'Cập nhật cấu hình',
    LOGIN_FAILED: 'Đăng nhập thất bại'
};

export const SERVICE_STATUS = {
    ACTIVE: 'Hoạt động',
    INACTIVE: 'Không hoạt động'
};

// Mock Data
export const MOCK_STATS = {
    totalUsers: 1234,
    todayActive: 456,
    totalOrgs: 89,
    totalSchools: 23
};

export const MOCK_SYSTEM_HEALTH = [
    { label: 'CPU', value: 45, color: '#10b981' },
    { label: 'RAM', value: 62, color: '#3b82f6' },
    { label: 'Disk', value: 38, color: '#a855f7' },
    { label: 'Network', value: 28, color: '#f59e0b' }
];

export const MOCK_QUICK_STATS = [
    { label: 'Người dùng mới (7 ngày)', value: 89, trend: 'up' },
    { label: 'Tỷ lệ hoạt động', value: '87%', trend: null },
    { label: 'Uptime', value: '99.9%', trend: null }
];

export const MOCK_SERVICES = [
    { name: 'Web Server', status: 'active' },
    { name: 'Database', status: 'active' },
    { name: 'Email Service', status: 'active' },
    { name: 'Storage', status: 'active' }
];

export const MOCK_ACTIVITIES = [
    {
        id: 1,
        action: 'Đăng nhập',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        time: '10:30:25',
        status: 'success'
    },
    {
        id: 2,
        action: 'Tạo người dùng',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        time: '10:25:12',
        status: 'success'
    },
    {
        id: 3,
        action: 'Cập nhật cấu hình',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        time: '09:15:45',
        status: 'success'
    },
    {
        id: 4,
        action: 'Đăng nhập thất bại',
        user: 'unknown@test.com',
        ip: '192.168.1.100',
        time: '08:45:30',
        status: 'error'
    }
];

export const MOCK_USERS = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        role: 'Sinh viên',
        status: 'active',
        joinDate: '15/01/2024',
        lastActive: '2 giờ trước'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'tranthib@fpt.com',
        role: 'Nhân viên HR',
        status: 'active',
        joinDate: '10/01/2024',
        lastActive: '1 giờ trước'
    },
    {
        id: 3,
        name: 'Lê Văn C',
        email: 'levanc@company.com',
        role: 'Quản trị viên',
        status: 'active',
        joinDate: '05/01/2024',
        lastActive: '30 phút trước'
    }
];

export const MOCK_ORGANIZATIONS = [
    {
        id: 1,
        name: 'FPT Software',
        type: 'company',
        status: 'active',
        joinDate: '01/2023',
        userCount: 45,
        activityLevel: 'Cao',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Đại học Bách Khoa Hà Nội',
        type: 'school',
        status: 'active',
        joinDate: '03/2022',
        userCount: 234,
        activityLevel: 'Cao',
        rating: 4.5
    }
];

export const MOCK_SYSTEM_LOGS = [
    {
        id: 1,
        time: '10:30:25',
        action: 'Đăng nhập',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        status: 'success'
    },
    {
        id: 2,
        time: '10:25:12',
        action: 'Tạo người dùng',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        status: 'success'
    },
    {
        id: 3,
        time: '09:15:45',
        action: 'Cập nhật cấu hình',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        status: 'success'
    },
    {
        id: 4,
        time: '08:45:30',
        action: 'Đăng nhập thất bại',
        user: 'unknown@test.com',
        ip: '192.168.1.100',
        status: 'error'
    }
];

export const MOCK_BACKUPS = [
    {
        id: 1,
        date: '16/01/2024 02:00',
        size: '2.4 GB',
        status: 'success'
    },
    {
        id: 2,
        date: '15/01/2024 02:00',
        size: '2.3 GB',
        status: 'success'
    },
    {
        id: 3,
        date: '14/01/2024 02:00',
        size: '2.3 GB',
        status: 'success'
    },
    {
        id: 4,
        date: '13/01/2024 02:00',
        size: '2.2 GB',
        status: 'success'
    }
];
