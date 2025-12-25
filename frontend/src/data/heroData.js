// src/data/heroData.js

import { Building2, Search, TrendingUp } from 'lucide-react';

const HERO_DATA = {
    title: 'Quản lý đăng ký thực tập',
    subtitle: '& Tuyển dụng thời gian thực',
    description:
        'Nền tảng kết nối chất chẽ giữa Nhà trường - Doanh nghiệp - Sinh viên với cơ chế phân quyền chuyên nghiệp và bảo mật cao',
    buttons: [
        {
            text: 'Đăng nhập hệ thống',
            icon: Building2,
            primary: true,
            action: 'login'
        },
        {
            text: 'Xem việc làm',
            icon: Search,
            action: 'jobs'
        },
        {
            text: 'Tin tức',
            icon: TrendingUp,
            action: 'news'
        }
    ]
};
export default HERO_DATA;
