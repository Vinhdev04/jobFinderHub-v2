// src/data/categoriesData.js

import {
    Briefcase,
    Code,
    Megaphone,
    Palette,
    DollarSign,
    Target
} from 'lucide-react';

const CATEGORIES = [
    {
        id: 'all',
        name: 'Tất cả',
        icon: Briefcase
    },
    {
        id: 'tech',
        name: 'Công nghệ thông tin',
        icon: Code
    },
    {
        id: 'marketing',
        name: 'Marketing',
        icon: Megaphone
    },
    {
        id: 'design',
        name: 'Thiết kế',
        icon: Palette
    },
    {
        id: 'business',
        name: 'Kinh doanh',
        icon: DollarSign
    },
    {
        id: 'finance',
        name: 'Tài chính',
        icon: Target
    }
];

export default CATEGORIES;

// export
