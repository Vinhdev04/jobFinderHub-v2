// src/components/about/FeatureCards.jsx
import React from 'react';
import styles from '../styles/FeatureCards.module.css';

const FeatureCards = () => {
    const features = [
        {
            icon: '🔐',
            title: 'Nguyên tắc Least Privilege',
            description:
                'Mỗi vai trò chỉ có quyền tối thiểu cần thiết để thực hiện nhiệm vụ, giảm thiểu rủi ro bảo mật.'
        },
        {
            icon: '🔄',
            title: 'Tách biệt quyền hạn',
            description:
                'Admin không can thiệp nghiệp vụ, Manager không truy cập hệ thống, đảm bảo tính chuyên nghiệp.'
        },
        {
            icon: '📝',
            title: 'Minh bạch & Khả năng truy vết',
            description:
                'Quy trình phê duyệt rõ ràng, ghi log hoạt động đầy đủ cho mọi hành động trong hệ thống.'
        }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Đặc điểm nổi bật</h2>
            <p className={styles.sectionSubtitle}>
                Hệ thống được xây dựng dựa trên các nguyên tắc bảo mật và quản
                lý tốt nhất
            </p>
            <div className={styles.container}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`${styles.card} ${
                            styles[`card${index + 1}`]
                        }`}
                    >
                        <div className={styles.icon}>{feature.icon}</div>
                        <h3 className={styles.title}>{feature.title}</h3>
                        <p className={styles.description}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureCards;
