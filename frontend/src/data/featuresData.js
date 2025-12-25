// src/data/featuresData.js

import { Clock, Shield, Building2, TrendingUp } from 'lucide-react';

export const FEATURES = [
    {
        icon: Clock,
        title: 'Thời gian thực',
        description: 'Cập nhật trạng thái và thông báo ngay lập tức'
    },
    {
        icon: Shield,
        title: 'Bảo mật cao',
        description: 'Phân quyền chặt chẽ theo nguyên tắc RBAC'
    },
    {
        icon: Building2,
        title: 'Kết nối 3 bên',
        description: 'Nhà trường - Doanh nghiệp - Sinh viên'
    },
    {
        icon: TrendingUp,
        title: 'Báo cáo chi tiết',
        description: 'Thống kê và phân tích hiệu quả tuyển dụng'
    }
];

export default FEATURES;
