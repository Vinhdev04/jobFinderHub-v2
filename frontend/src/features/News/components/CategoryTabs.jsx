// src/components/news/CategoryTabs.jsx
import styles from '../styles/CategoryTabs.module.css';

const categories = [
  { icon: '📄', label: 'Tất cả', active: true },
  { icon: '📈', label: 'Xu hướng' },
  { icon: '📚', label: 'Hướng dẫn' },
  { icon: '🎯', label: 'Câu chuyện thành công' },
  { icon: '💼', label: 'Mẹo nghề nghiệp' },
];

export default function CategoryTabs() {
  return (
    <section className={styles.section}>
      <div className={styles.tabsContainer}>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`${styles.tab} ${cat.active ? styles.active : ''}`}
          >
            <span className={styles.icon}>{cat.icon}</span>
            <span className={styles.label}>{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}