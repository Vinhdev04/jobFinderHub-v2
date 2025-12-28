// src/components/about/BenefitsSection.jsx
import React from 'react';
import styles from '../styles/BenefitsSection.module.css';

const BenefitsSection = () => {
    const benefits = [
        {
            icon: '⚡',
            title: 'Hiệu quả',
            description:
                'Tự động hóa quy trình, tiết kiệm thời gian và công sức'
        },
        {
            icon: '🛡️',
            title: 'An toàn',
            description: 'Bảo mật thông tin, phân quyền chặt chẽ'
        },
        {
            icon: '📈',
            title: 'Minh bạch',
            description: 'Theo dõi tiến độ, báo cáo chi tiết'
        },
        {
            icon: '🤝',
            title: 'Kết nối',
            description: 'Cầu nối sinh viên và doanh nghiệp'
        }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Lợi ích vượt trội</h2>
            <p className={styles.sectionSubtitle}>
                Mang lại giá trị thực tế cho tất cả các bên liên quan
            </p>
            <div className={styles.container}>
                {benefits.map((benefit, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.icon}>{benefit.icon}</div>
                        <h3 className={styles.title}>{benefit.title}</h3>
                        <p className={styles.description}>
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
