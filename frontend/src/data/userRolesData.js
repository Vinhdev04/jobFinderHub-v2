// src/data/userRolesData.js

import { GraduationCap, Users, Briefcase, Shield } from 'lucide-react';

const USER_ROLES = [
    {
        icon: GraduationCap,
        title: 'Sinh viên',
        description:
            'Tìm kiếm cơ hội thực tập, nộp hồ sơ và theo dõi tiến trình ứng tuyển',
        color: 'from-teal-400 to-teal-600',
        route: '/student'
    },
    {
        icon: Users,
        title: 'Nhân viên tuyển dụng',
        description:
            'Đăng tin tuyển dụng, sàng lọc ứng viên và quản lý quy trình phỏng vấn',
        color: 'from-blue-400 to-blue-600',
        route: '/recruiter'
    },
    {
        icon: Briefcase,
        title: 'Quản lý doanh nghiệp',
        description:
            'Quản lý đội ngũ tuyển dụng, phê duyệt tin và xem báo cáo hiệu quả',
        color: 'from-indigo-400 to-indigo-600',
        route: '/company-manager'
    },
    {
        icon: Users,
        title: 'Giáo vụ',
        description:
            'Phê duyệt tin tuyển dụng, quản lý sinh viên thực tập và doanh nghiệp',
        color: 'from-cyan-400 to-cyan-600',
        route: '/academic-staff'
    },
    {
        icon: Shield,
        title: 'Quản trị hệ thống',
        description:
            'Quản lý người dùng, cấu hình hệ thống và giám sát hoạt động',
        color: 'from-gray-600 to-gray-800',
        route: '/admin'
    }
];
export default USER_ROLES;

//
