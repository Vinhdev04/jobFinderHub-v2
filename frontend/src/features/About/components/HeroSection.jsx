// src/components/about/HeroSection.jsx
import React from 'react';
import styles from '../styles/HeroSection.module.css';

const HeroSection = () => {
    const stats = [
        { number: '1000+', label: 'Sinh viên đăng ký' },
        { number: '200+', label: 'Doanh nghiệp đối tác' },
        { number: '500+', label: 'Vị trí thực tập' },
        { number: '95%', label: 'Tỷ lệ hài lòng' }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.icon}>🛡️</div>
                <h1 className={styles.title}>
                    Hệ thống Quản lý Thực tập & Tuyển dụng
                </h1>
                <p className={styles.description}>
                    Nền tảng kết nối sinh viên và doanh nghiệp với hệ thống phân
                    quyền chuyên nghiệp (RBAC), tách biệt hoàn toàn quyền quản
                    trị hệ thống và quyền quản lý nghiệp vụ, đảm bảo tính bảo
                    mật và hiệu quả cao.
                </p>
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statNumber}>
                                {stat.number}
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
