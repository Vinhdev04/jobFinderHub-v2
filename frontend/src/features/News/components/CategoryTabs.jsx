// src/components/news/CategoryTabs.jsx
import React, { useState } from 'react';
import styles from '../styles/CategoryTabs.module.css';

const CategoryTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const categories = [
        { icon: '📄', label: 'Tất cả' },
        { icon: '📈', label: 'Xu hướng' },
        { icon: '📚', label: 'Hướng dẫn' },
        { icon: '🎯', label: 'Câu chuyện thành công' },
        { icon: '💼', label: 'Mẹo nghề nghiệp' }
    ];

    return (
        <section className={styles.categoryTabs}>
            <div className={styles.categoryTabs__container}>
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`${styles.categoryTabs__tab} ${
                            index === activeTab
                                ? styles['categoryTabs__tab--active']
                                : ''
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        <span className={styles.categoryTabs__icon}>
                            {cat.icon}
                        </span>
                        <span className={styles.categoryTabs__label}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategoryTabs;
