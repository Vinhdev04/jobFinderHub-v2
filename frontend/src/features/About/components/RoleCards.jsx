// src/components/about/RoleCards.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/RoleCards.module.css';

const RoleCards = () => {
    const navigate = useNavigate();

    const roles = [
        {
            icon: '👨‍💼',
            title: 'System Admin',
            description:
                'Quản trị hệ thống, cấu hình, bảo mật, quản lý tài khoản và quyền truy cập toàn bộ hệ thống.',
            route: '/admin'
        },
        {
            icon: '📊',
            title: 'Business Manager',
            description:
                'Quản lý nghiệp vụ thực tập và tuyển dụng, phê duyệt hồ sơ, theo dõi tiến độ và báo cáo.',
            route: '/recruiter'
        },
        {
            icon: '🎓',
            title: 'Student',
            description:
                'Đăng ký thực tập, nộp hồ sơ, theo dõi trạng thái và cập nhật tiến độ thực tập của mình.',
            route: '/student'
        },
        {
            icon: '🏢',
            title: 'Company',
            description:
                'Đăng tin tuyển dụng, quản lý ứng viên, đánh giá sinh viên và báo cáo kết quả thực tập.',
            route: '/company'
        },
        {
            icon: '👨‍🏫',
            title: 'Teacher',
            description:
                'Hướng dẫn sinh viên thực tập, đánh giá kết quả, theo dõi tiến độ và hỗ trợ trong quá trình thực tập.',
            route: '/teacher'
        }
    ];

    const handleNavigate = (route) => {
        navigate(route);
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Các vai trò trong hệ thống</h2>
            <p className={styles.sectionSubtitle}>
                Mỗi vai trò có chức năng và quyền hạn riêng biệt, phối hợp cùng
                nhau tạo nên một hệ thống hoàn chỉnh
            </p>
            <div className={styles.container}>
                {roles.map((role, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <span className={styles.icon}>{role.icon}</span>
                        </div>
                        <h3 className={styles.title}>{role.title}</h3>
                        <p className={styles.description}>{role.description}</p>
                        <button
                            className={styles.button}
                            onClick={() => handleNavigate(role.route)}
                        >
                            Tìm hiểu thêm →
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoleCards;
