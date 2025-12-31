// src/features/Admin/constants/dashboardConstants.js
import {
    Users,
    Building2,
    GraduationCap,
    Activity,
    Settings,
    Database
} from 'lucide-react';

// Navigation Items
export const NAVIGATION_ITEMS = [
    { id: 'overview', label: 'Tổng quan', icon: Activity },
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'organizations', label: 'Tổ chức', icon: Building2 },
    { id: 'managers', label: 'Nhân sự', icon: Users },
    { id: 'schools', label: 'Trường học', icon: GraduationCap },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
    { id: 'backup', label: 'Sao lưu', icon: Database }
];

// Mock Stats
export const MOCK_STATS = {
    totalUsers: 1234,
    activeToday: 456,
    organizations: 89,
    activeStudents: 856
};

// Mock System Health
export const MOCK_SYSTEM_HEALTH = [
    { label: 'CPU', value: 45, color: '#10b981' },
    { label: 'RAM', value: 62, color: '#3b82f6' },
    { label: 'Disk', value: 38, color: '#14b8a6' },
    { label: 'Network', value: 28, color: '#f59e0b' }
];

// Mock Activities
export const MOCK_ACTIVITIES = [
    {
        id: 1,
        action: 'Đăng nhập hệ thống',
        user: 'admin@system.com',
        ip: '192.168.1.1',
        time: '10:30:25',
        status: 'success'
    },
    {
        id: 2,
        action: 'Tạo tài khoản mới',
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
        status: 'warning'
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

// Mock Users
export const MOCK_USERS = [
    {
        id: 1,
        name: 'Nguyễn Văn Hùng',
        email: 'hung.nguyen@fpt.com',
        role: 'admin',
        status: 'active',
        organization: 'FPT Software',
        joinDate: '2024-01-23 14:30'
    },
    {
        id: 2,
        name: 'Ts. Nguyễn Thị Mai',
        email: 'mai.nguyen@hust.edu.vn',
        role: 'hr',
        status: 'active',
        organization: 'ĐH Bách Khoa HN',
        joinDate: '2024-01-23 13:45'
    },
    {
        id: 3,
        name: 'Nguyễn Thị Lan',
        email: 'lan.nguyen@fpt.com',
        role: 'student',
        status: 'active',
        organization: 'FPT Software',
        joinDate: '2024-01-23 12:20'
    },
    {
        id: 4,
        name: 'Nguyễn Văn A',
        email: 'a.nguyen@student.hust.edu.vn',
        role: 'student',
        status: 'active',
        organization: 'ĐH Bách Khoa HN',
        joinDate: '2024-01-23 11:30'
    }
];

// Mock Organizations
export const MOCK_ORGANIZATIONS = [
    {
        id: 1,
        name: 'FPT Software',
        type: 'company',
        status: 'active',
        userCount: 234,
        activeRate: 'Cao',
        rating: 4.5,
        joinDate: '01/2023'
    },
    {
        id: 2,
        name: 'Đại học Bách Khoa Hà Nội',
        type: 'school',
        status: 'active',
        userCount: 567,
        activeRate: 'Cao',
        rating: 4.8,
        joinDate: '03/2022'
    },
    {
        id: 3,
        name: 'Viettel Group',
        type: 'company',
        status: 'active',
        userCount: 189,
        activeRate: 'Trung bình',
        rating: 4.3,
        joinDate: '06/2023'
    }
];
