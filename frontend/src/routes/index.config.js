// src/config/index.config.js

import HomePage from '@pages/Home/HomePage';
import LoginPage from '@pages/Login.jsx';
import RegisterPage from '@pages/Register.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
import JobPages from '@pages/JobsPage.jsx';

// Dashboard imports
import StudentDashboard from '@pages/StudentDashboard.jsx';
// import TeacherDashboard from '@pages/TeacherDashboard.jsx';
// import CompanyDashboard from '@pages/CompanyDashboard.jsx';

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
    {
        path: '/jobs',
        element: JobPages,
        layout: 'main',
        meta: {
            title: 'Việc làm',
            requiresAuth: false,
            showNavbar: true,
            showFooter: true
        }
    },
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

    // Protected routes - Dashboard by role
    {
        path: '/dashboard/student',
        element: StudentDashboard,
        layout: 'dashboard',
        meta: {
            title: 'Dashboard Sinh viên',
            requiresAuth: true,
            requiredRole: 'student',
            showNavbar: false,
            showFooter: false
        }
    },
    // {
    //     path: '/dashboard/teacher',
    //     element: TeacherDashboard,
    //     layout: 'dashboard',
    //     meta: {
    //         title: 'Dashboard Giảng viên',
    //         requiresAuth: true,
    //         requiredRole: 'teacher',
    //         showNavbar: false,
    //         showFooter: false
    //     }
    // },
    // {
    //     path: '/dashboard/company',
    //     element: CompanyDashboard,
    //     layout: 'dashboard',
    //     meta: {
    //         title: 'Dashboard Nhà tuyển dụng',
    //         requiresAuth: true,
    //         requiredRole: 'company',
    //         showNavbar: false,
    //         showFooter: false
    //     }
    // },

    // Generic dashboard redirect based on role
    {
        path: '/dashboard',
        element: null, // Will redirect based on user role
        layout: 'dashboard',
        meta: {
            title: 'Bảng điều khiển',
            requiresAuth: true,
            redirect: 'role-based', // Special flag
            showNavbar: false,
            showFooter: false
        }
    },

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

// Dashboard redirect mapping
export const dashboardRedirects = {
    student: '/dashboard/student',
    teacher: '/dashboard/teacher',
    company: '/dashboard/company',
    admin: '/dashboard/admin'
};

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

// User menu links (authenticated) - Will show based on role
export const userMenuLinks = [
    {
        label: 'Hồ sơ của tôi',
        href: '/profile',
        icon: 'User',
        roles: ['student', 'teacher', 'company', 'admin']
    },
    {
        label: 'Bảng điều khiển',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        roles: ['student', 'teacher', 'company', 'admin']
    },
    {
        label: 'Đăng xuất',
        action: 'logout',
        icon: 'LogOut',
        roles: ['student', 'teacher', 'company', 'admin']
    }
];

// Role-based dashboard navigation
export const dashboardNavLinks = {
    student: [
        {
            label: 'Tổng quan',
            href: '/dashboard/student',
            icon: 'LayoutDashboard',
            active: true
        },
        {
            label: 'Tìm việc làm',
            href: '/jobs',
            icon: 'Search'
        },
        {
            label: 'Đơn ứng tuyển',
            href: '/dashboard/student/applications',
            icon: 'FileText'
        },
        {
            label: 'Lịch phỏng vấn',
            href: '/dashboard/student/interviews',
            icon: 'Calendar'
        },
        {
            label: 'Hồ sơ cá nhân',
            href: '/dashboard/student/profile',
            icon: 'User'
        },
        {
            label: 'CV của tôi',
            href: '/dashboard/student/cv',
            icon: 'FileText'
        },
        {
            label: 'Công ty đã lưu',
            href: '/dashboard/student/saved',
            icon: 'Bookmark'
        }
    ],
    teacher: [
        {
            label: 'Tổng quan',
            href: '/dashboard/teacher',
            icon: 'LayoutDashboard',
            active: true
        },
        {
            label: 'Sinh viên của tôi',
            href: '/dashboard/teacher/students',
            icon: 'Users'
        },
        {
            label: 'Quản lý CV',
            href: '/dashboard/teacher/cv-management',
            icon: 'FileText'
        },
        {
            label: 'Thống kê',
            href: '/dashboard/teacher/analytics',
            icon: 'BarChart'
        },
        {
            label: 'Tin nhắn',
            href: '/dashboard/teacher/messages',
            icon: 'MessageSquare'
        }
    ],
    company: [
        {
            label: 'Tổng quan',
            href: '/dashboard/company',
            icon: 'LayoutDashboard',
            active: true
        },
        {
            label: 'Đăng tin tuyển dụng',
            href: '/dashboard/company/post-job',
            icon: 'PlusCircle'
        },
        {
            label: 'Quản lý tin đăng',
            href: '/dashboard/company/jobs',
            icon: 'Briefcase'
        },
        {
            label: 'Ứng viên',
            href: '/dashboard/company/candidates',
            icon: 'Users'
        },
        {
            label: 'Lịch phỏng vấn',
            href: '/dashboard/company/interviews',
            icon: 'Calendar'
        },
        {
            label: 'Thông tin công ty',
            href: '/dashboard/company/profile',
            icon: 'Building2'
        }
    ],
    admin: [
        {
            label: 'Tổng quan',
            href: '/dashboard/admin',
            icon: 'LayoutDashboard',
            active: true
        },
        {
            label: 'Quản lý người dùng',
            href: '/dashboard/admin/users',
            icon: 'Users'
        },
        {
            label: 'Quản lý công ty',
            href: '/dashboard/admin/companies',
            icon: 'Building2'
        },
        {
            label: 'Quản lý tin đăng',
            href: '/dashboard/admin/jobs',
            icon: 'Briefcase'
        },
        {
            label: 'Thống kê',
            href: '/dashboard/admin/analytics',
            icon: 'BarChart'
        },
        {
            label: 'Báo cáo',
            href: '/dashboard/admin/reports',
            icon: 'FileText'
        }
    ]
};

// Student specific routes (nested under dashboard)
export const studentRoutes = [
    {
        path: '/dashboard/student',
        name: 'overview',
        meta: { title: 'Tổng quan' }
    },
    {
        path: '/dashboard/student/applications',
        name: 'applications',
        meta: { title: 'Đơn ứng tuyển' }
    },
    {
        path: '/dashboard/student/interviews',
        name: 'interviews',
        meta: { title: 'Lịch phỏng vấn' }
    },
    {
        path: '/dashboard/student/profile',
        name: 'profile',
        meta: { title: 'Hồ sơ cá nhân' }
    },
    {
        path: '/dashboard/student/cv',
        name: 'cv',
        meta: { title: 'CV của tôi' }
    },
    {
        path: '/dashboard/student/saved',
        name: 'saved',
        meta: { title: 'Công ty đã lưu' }
    }
];

// Teacher specific routes (for future)
export const teacherRoutes = [
    {
        path: '/dashboard/teacher',
        name: 'overview',
        meta: { title: 'Tổng quan' }
    },
    {
        path: '/dashboard/teacher/students',
        name: 'students',
        meta: { title: 'Sinh viên' }
    },
    {
        path: '/dashboard/teacher/cv-management',
        name: 'cv-management',
        meta: { title: 'Quản lý CV' }
    },
    {
        path: '/dashboard/teacher/analytics',
        name: 'analytics',
        meta: { title: 'Thống kê' }
    }
];

// Company specific routes (for future)
export const companyRoutes = [
    {
        path: '/dashboard/company',
        name: 'overview',
        meta: { title: 'Tổng quan' }
    },
    {
        path: '/dashboard/company/post-job',
        name: 'post-job',
        meta: { title: 'Đăng tin' }
    },
    {
        path: '/dashboard/company/jobs',
        name: 'jobs',
        meta: { title: 'Quản lý tin đăng' }
    },
    {
        path: '/dashboard/company/candidates',
        name: 'candidates',
        meta: { title: 'Ứng viên' }
    }
];

// Helper function to get dashboard route by role
export const getDashboardRoute = (role) => {
    return dashboardRedirects[role] || '/';
};

// Helper function to check if user has access to route
export const canAccessRoute = (route, userRole) => {
    if (!route.meta.requiresAuth) return true;
    if (!route.meta.requiredRole) return true;
    return route.meta.requiredRole === userRole;
};

// Helper function to get nav links by role
export const getNavLinksByRole = (role) => {
    return dashboardNavLinks[role] || [];
};

export default routes;
