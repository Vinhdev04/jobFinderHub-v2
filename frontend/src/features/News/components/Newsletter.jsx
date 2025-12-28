// src/components/news/Newsletter.jsx
import React, { useState } from 'react';
import styles from '../styles/Newsletter.module.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Subscribed:', email);
        setEmail('');
    };

    return (
        <section className={styles.newsletter}>
            <div className={styles.newsletter__container}>
                <div className={styles.newsletter__content}>
                    <div className={styles.newsletter__icon}>✉️</div>
                    <h3 className={styles.newsletter__title}>
                        Đăng ký nhận tin tức mới nhất
                    </h3>
                    <p className={styles.newsletter__subtitle}>
                        Cập nhật xu hướng tuyển dụng và mẹo nghề nghiệp mỗi tuần
                    </p>
                </div>
                <form
                    className={styles.newsletter__form}
                    onSubmit={handleSubmit}
                >
                    <input
                        type='email'
                        placeholder='Nhập email của bạn'
                        className={styles.newsletter__input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type='submit' className={styles.newsletter__submit}>
                        Đăng ký
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
