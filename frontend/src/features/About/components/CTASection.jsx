// src/components/about/CTASection.jsx
import React from 'react';
import styles from '../styles/CTASection.module.css';

const CTASection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Sẵn sàng bắt đầu?</h2>
                <p className={styles.description}>
                    Tham gia cùng hàng nghìn sinh viên và doanh nghiệp đã tin
                    tưởng sử dụng hệ thống
                </p>
                <div className={styles.buttons}>
                    <a href='#' className={styles.btnPrimary}>
                        Đăng ký ngay
                    </a>
                    <a href='#' className={styles.btnSecondary}>
                        Tìm hiểu thêm
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
