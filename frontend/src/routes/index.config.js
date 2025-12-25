// src/config/index.config.js

import HomePage from '@pages/Home/HomePage';
import LoginPage from '@pages/Login.jsx';
import RegisterPage from '@pages/Register.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
// import LoginPage from '@pages/Auth/LoginPage';
// import RegisterPage from '@pages/Auth/RegisterPage';
// import JobsPage from '@pages/Jobs/JobsPage';
// import JobDetailPage from '@pages/Jobs/JobDetailPage';
// import NewsPage from '@pages/News/NewsPage';
// import NewsDetailPage from '@pages/News/NewsDetailPage';
// import AboutPage from '@pages/About/AboutPage';
// import ProfilePage from '@pages/Profile/ProfilePage';
// import DashboardPage from '@pages/Dashboard/DashboardPage';
// import NotFoundPage from '@pages/NotFound/NotFoundPage';

// Route configuration
export const routes = [
    // Public routes
    {
        path: '/',
        element: HomePage,
        layout: 'main',
        meta: {
            title: 'Trang chủ',
            requiresAuth: false,
            showNavbar: true,
            showFooter: true
        }
    },
    {
        path: '/login',
        element: LoginPage,
        layout: 'auth',
        meta: {
            title: 'Đăng nhập',
            requiresAuth: false,
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/register',
        element: RegisterPage,
        layout: 'auth',
        meta: {
            title: 'Đăng ký tài khoản',
            requiresAuth: false,
            showNavbar: false,
            showFooter: false
        }
    },
    // {
    //     path: '/jobs',
    //     element: JobsPage,
    //     layout: 'main',
    //     meta: {
    //         title: 'Việc làm',
    //         requiresAuth: false,
    //         showNavbar: true,
    //         showFooter: true
    //     }
    // },
    // {
    //     path: '/jobs/:id',
    //     element: JobDetailPage,
    //     layout: 'main',
    //     meta: {
    //         title: 'Chi tiết việc làm',
    //         requiresAuth: false,
    //         showNavbar: true,
    //         showFooter: true
    //     }
    // },
    // {
    //     path: '/news',
    //     element: NewsPage,
    //     layout: 'main',
    //     meta: {
    //         title: 'Tin tức',
    //         requiresAuth: false,
    //         showNavbar: true,
    //         showFooter: true
    //     }
    // },
    // {
    //     path: '/news/:id',
    //     element: NewsDetailPage,
    //     layout: 'main',
    //     meta: {
    //         title: 'Chi tiết tin tức',
    //         requiresAuth: false,
    //         showNavbar: true,
    //         showFooter: true
    //     }
    // },
    // {
    //     path: '/about',
    //     element: AboutPage,
    //     layout: 'main',
    //     meta: {
    //         title: 'Giới thiệu',
    //         requiresAuth: false,
    //         showNavbar: true,
    //         showFooter: true
    //     }
    // },

    // Protected routes
    // {
    //     path: '/profile',
    //     element: ProfilePage,
    //     layout: 'main',
    //     meta: {
    //         title: 'Hồ sơ cá nhân',
    //         requiresAuth: true,
    //         showNavbar: true,
    //         showFooter: true
    //     }
    // },
    // {
    //     path: '/dashboard',
    //     element: DashboardPage,
    //     layout: 'dashboard',
    //     meta: {
    //         title: 'Bảng điều khiển',
    //         requiresAuth: true,
    //         showNavbar: true,
    //         showFooter: false
    //     }
    // },
    // 404 route
    {
        path: '*',
        element: NotFoundPage,
        layout: 'main',
        meta: {
            title: 'Không tìm thấy trang',
            requiresAuth: false,
            showNavbar: true,
            showFooter: true
        }
    }
];

// Navigation links for navbar
export const navLinks = [
    {
        label: 'Trang chủ',
        href: '/',
        icon: 'Home'
    },
    {
        label: 'Việc làm',
        href: '/jobs',
        icon: 'Briefcase'
    },
    {
        label: 'Tin tức',
        href: '/news',
        icon: 'Newspaper'
    },
    {
        label: 'Giới thiệu',
        href: '/about',
        icon: 'Info'
    }
];

// User menu links (authenticated)
export const userMenuLinks = [
    {
        label: 'Hồ sơ của tôi',
        href: '/profile',
        icon: 'User'
    },
    {
        label: 'Bảng điều khiển',
        href: '/dashboard',
        icon: 'LayoutDashboard'
    },
    {
        label: 'Đăng xuất',
        action: 'logout',
        icon: 'LogOut'
    }
];

// Role-based routes
export const roleRoutes = {
    student: [
        {
            label: 'Ứng tuyển của tôi',
            href: '/my-applications',
            icon: 'FileText'
        },
        {
            label: 'Công ty đã lưu',
            href: '/saved-companies',
            icon: 'Bookmark'
        }
    ],
    recruiter: [
        {
            label: 'Đăng tin tuyển dụng',
            href: '/post-job',
            icon: 'PlusCircle'
        },
        {
            label: 'Quản lý tin đăng',
            href: '/manage-jobs',
            icon: 'Briefcase'
        },
        {
            label: 'Ứng viên',
            href: '/candidates',
            icon: 'Users'
        }
    ],
    admin: [
        {
            label: 'Quản lý người dùng',
            href: '/admin/users',
            icon: 'Users'
        },
        {
            label: 'Quản lý công ty',
            href: '/admin/companies',
            icon: 'Building2'
        },
        {
            label: 'Thống kê',
            href: '/admin/analytics',
            icon: 'BarChart'
        }
    ]
};

export default routes;
