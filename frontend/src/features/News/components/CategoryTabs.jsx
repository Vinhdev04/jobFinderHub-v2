// src/components/news/CategoryTabs.jsx
import React from 'react';
import styles from '../styles/CategoryTabs.module.css';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        { icon: '📄', label: 'Tất cả', value: 'Tất cả' },
        { icon: '📈', label: 'Xu hướng', value: 'Xu hướng' },
        { icon: '📚', label: 'Hướng dẫn', value: 'Hướng dẫn' },
        {
            icon: '🎯',
            label: 'Câu chuyện thành công',
            value: 'Câu chuyện thành công'
        },
        { icon: '💼', label: 'Mẹo nghề nghiệp', value: 'Mẹo nghề nghiệp' }
    ];

    return (
        <section className={styles.categoryTabs}>
            <div className={styles.categoryTabs__container}>
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`${styles.categoryTabs__tab} ${
                            activeCategory === cat.value
                                ? styles['categoryTabs__tab--active']
                                : ''
                        }`}
                        onClick={() => onCategoryChange(cat.value)}
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
