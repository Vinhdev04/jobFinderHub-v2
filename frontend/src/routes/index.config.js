// src/config/index.config.js

// Public pages
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/Login.jsx';
import RegisterPage from '@pages/Register.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
import JobPages from '@pages/JobsPage.jsx';
import JobDetailPage from '@pages/JobDetailPage.jsx';
import JobApplyPage from '@pages/JobApplyPage.jsx';

// Dashboards
import StudentDashboard from '@pages/StudentDashboard.jsx';
import StudentApplicationDetail from '@pages/StudentApplicationDetail.jsx';
import RecruiterDashboard from '@pages/RecruiterDashboard.jsx';
import CompanyDashboard from '@pages/CompanyDashboard.jsx';
import TeacherDashboard from '@pages/TeacherDashboard.jsx';
import AdminDashboard from '@pages/AdminDashboard.jsx';
import NewsPage from '@pages/NewsPage';
import AboutPage from '@pages/AboutPage';
import NewDetailPages from '@pages/NewDetailPage';
import ForgotPasswordPage from '@pages/ForgotPasswordPage.jsx';
// =======================
// ROUTES CONFIG
// =======================
export const routes = [
    // ===== PUBLIC ROUTES =====
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
        path: '/news',
        element: NewsPage,
        layout: 'main',
        meta: {
            title: 'Tin tức',
            requiresAuth: false,
            showNavbar: true,
            showFooter: true
        }
    },
    {
        path: '/news/:id',
        element: NewDetailPages,
        layout: 'main',
        meta: {
            title: 'Chi tiết bài viết',
            requiresAuth: false,
            showNavbar: true,
            showFooter: true
        }
    },
    {
        path: '/about',
        element: AboutPage,
        layout: 'main',
        meta: {
            title: 'Giới thiệu',
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
        path: '/forgot-password',
        element: ForgotPasswordPage,
        layout: 'auth',
        meta: {
            title: 'Quên mật khẩu',
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
    {
        path: '/jobs/:id',
        element: JobDetailPage,
        layout: 'main',
        meta: {
            title: 'Chi tiết công việc',
            requiresAuth: false,
            showNavbar: true,
            showFooter: true
        }
    },
    {
        path: '/jobs/:id/apply',
        element: JobApplyPage,
        layout: 'main',
        meta: {
            title: 'Ứng tuyển',
            requiresAuth: true,
            showNavbar: true,
            showFooter: true
        }
    },

    // ===== ROLE DASHBOARDS =====
    {
        path: '/student',
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
    {
        path: '/student/applications',
        element: StudentDashboard,
        layout: 'dashboard',
        meta: {
            title: 'Đơn ứng tuyển',
            requiresAuth: true,
            requiredRole: 'student',
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/student/applications/:id',
        element: StudentApplicationDetail,
        layout: 'dashboard',
        meta: {
            title: 'Chi tiết đơn ứng tuyển',
            requiresAuth: true,
            requiredRole: 'student',
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/recruiter',
        element: RecruiterDashboard,
        layout: 'dashboard',
        meta: {
            title: 'Dashboard Nhà tuyển dụng',
            requiresAuth: true,
            requiredRole: 'recruiter',
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/company',
        element: CompanyDashboard,
        layout: 'dashboard',
        meta: {
            title: 'Dashboard Công ty',
            requiresAuth: true,
            requiredRole: 'company',
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/teacher',
        element: TeacherDashboard,
        layout: 'dashboard',
        meta: {
            title: 'Dashboard Giảng viên',
            requiresAuth: true,
            requiredRole: 'teacher',
            showNavbar: false,
            showFooter: false
        }
    },
    {
        path: '/admin',
        element: AdminDashboard,
        layout: 'dashboard',
        meta: {
            title: 'Dashboard Quản trị hệ thống',
            requiresAuth: true,
            requiredRole: 'admin',
            showNavbar: false,
            showFooter: false
        }
    },

    // ===== DASHBOARD (ROLE BASED REDIRECT) =====
    {
        path: '/dashboard',
        element: null,
        layout: 'dashboard',
        meta: {
            title: 'Bảng điều khiển',
            requiresAuth: true,
            redirect: 'role-based',
            showNavbar: false,
            showFooter: false
        }
    },

    // ===== 404 =====
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

// =======================
// DASHBOARD REDIRECTS
// =======================
export const dashboardRedirects = {
    student: '/student',
    recruiter: '/recruiter',
    company: '/company',
    admin: '/dashboard/admin'
};

// =======================
// NAVBAR LINKS
// =======================
export const navLinks = [
    { label: 'Trang chủ', href: '/', icon: 'Home' },
    { label: 'Việc làm', href: '/jobs', icon: 'Briefcase' },
    { label: 'Tin tức', href: '/news', icon: 'Newspaper' },
    { label: 'Giới thiệu', href: '/about', icon: 'Info' }
];

// =======================
// USER MENU
// =======================
export const userMenuLinks = [
    {
        label: 'Hồ sơ của tôi',
        href: '/profile',
        icon: 'User',
        roles: ['student', 'recruiter', 'company', 'admin']
    },
    {
        label: 'Bảng điều khiển',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        roles: ['student', 'recruiter', 'company', 'admin']
    },
    {
        label: 'Đăng xuất',
        action: 'logout',
        icon: 'LogOut',
        roles: ['student', 'recruiter', 'company', 'admin']
    }
];

// =======================
// DASHBOARD NAV BY ROLE
// =======================
export const dashboardNavLinks = {
    student: [
        { label: 'Tổng quan', href: '/student', icon: 'LayoutDashboard' },
        { label: 'Tìm việc làm', href: '/jobs', icon: 'Search' },
        {
            label: 'Đơn ứng tuyển',
            href: '/student/applications',
            icon: 'FileText'
        }
    ],
    recruiter: [
        { label: 'Tổng quan', href: '/recruiter', icon: 'LayoutDashboard' },
        { label: 'Ứng viên', href: '/recruiter/candidates', icon: 'Users' }
    ],
    company: [
        { label: 'Tổng quan', href: '/company', icon: 'LayoutDashboard' },
        {
            label: 'Đăng tin tuyển dụng',
            href: '/company/post-job',
            icon: 'PlusCircle'
        },
        { label: 'Quản lý tin đăng', href: '/company/jobs', icon: 'Briefcase' }
    ]
};

// =======================
// HELPERS
// =======================
export const getDashboardRoute = (role) => dashboardRedirects[role] || '/';

export const canAccessRoute = (route, userRole) => {
    if (!route.meta?.requiresAuth) return true;
    if (!route.meta?.requiredRole) return true;
    return route.meta.requiredRole === userRole;
};

export const getNavLinksByRole = (role) => dashboardNavLinks[role] || [];

export default routes;
