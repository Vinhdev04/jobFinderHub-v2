// src/components/about/WorkflowSection.jsx
import React from 'react';
import styles from '../styles/WorkflowSection.module.css';

const WorkflowSection = () => {
    const workflowSteps = [
        {
            title: 'Đăng ký & Xác thực',
            description:
                'Sinh viên và doanh nghiệp đăng ký tài khoản, xác thực email và hoàn thiện hồ sơ cá nhân.'
        },
        {
            title: 'Đăng tin & Ứng tuyển',
            description:
                'Doanh nghiệp đăng tin tuyển dụng thực tập, sinh viên tìm kiếm và nộp hồ sơ ứng tuyển.'
        },
        {
            title: 'Phê duyệt & Kết nối',
            description:
                'Manager phê duyệt hồ sơ, kết nối sinh viên với doanh nghiệp phù hợp.'
        },
        {
            title: 'Theo dõi & Đánh giá',
            description:
                'Theo dõi tiến độ thực tập, doanh nghiệp đánh giá sinh viên, sinh viên báo cáo kết quả.'
        }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quy trình hoạt động</h2>
            <p className={styles.sectionSubtitle}>
                Từ đăng ký đến hoàn thành thực tập, tất cả được quản lý một cách
                chuyên nghiệp
            </p>
            <div className={styles.container}>
                {workflowSteps.map((step, index) => (
                    <div
                        key={index}
                        className={`${styles.step} ${
                            index % 2 === 1 ? styles.stepReverse : ''
                        }`}
                    >
                        <div className={styles.number}>{index + 1}</div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.description}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkflowSection;
