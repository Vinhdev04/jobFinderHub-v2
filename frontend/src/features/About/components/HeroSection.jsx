// src/components/about/HeroSection.jsx
import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.icon}>🛡️</div>
        <h1 className={styles.title}>Bảo mật & Phân quyền chuyên nghiệp</h1>
        <p className={styles.description}>
          Hệ thống áp dụng mô hình phân quyền chặt chẽ (RBAC), tách biệt hoàn toàn quyền quản trị hệ thống (System Admin) và quyền quản lý nghiệp vụ (Business Manager), đảm bảo tính bảo mật và chuyên nghiệp.
        </p>
      </div>
    </section>
  );
}