// src/data/securityData.js

export const SECURITY_FEATURES = [
    {
        title: 'Nguyên tắc Least Privilege',
        description: 'Mỗi vai trò chỉ có quyền tối thiểu cần để làm việc'
    },
    {
        title: 'Tách biệt quyền hạn',
        description:
            'Admin không can thiệp nghiệp vụ, Manager không truy cập hệ thống'
    },
    {
        title: 'Minh bạch & Khách quan',
        description: 'Quy trình phê duyệt rõ ràng, không chồng chéo'
    }
];

export const ROLE_DETAILS = [
    {
        name: 'System Admin',
        title: 'Quản lý kỹ thuật',
        description: 'Tạo tài khoản, cấu hình hệ thống, xem logs',
        color: 'teal'
    },
    {
        name: 'Academic Staff',
        title: 'Quản lý nghiệp vụ nhà trường',
        description: 'Phê duyệt tin, quản lý sinh viên thực tập',
        color: 'indigo'
    },
    {
        name: 'Company Manager',
        title: 'Quản lý nghiệp vụ doanh nghiệp',
        description: 'Phê duyệt nội bộ, quản lý nhân viên',
        color: 'blue'
    }
];
