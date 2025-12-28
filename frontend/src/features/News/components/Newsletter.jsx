// src/components/news/Newsletter.jsx
import styles from '../styles/Newsletter.module.css';

export default function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>✉️</div>
          <h3 className={styles.title}>Đăng ký nhận tin tức mới nhất</h3>
          <p className={styles.subtitle}>
            Cập nhật xu hướng tuyển dụng và mẹo nghề nghiệp mỗi tuần
          </p>
        </div>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submit}>
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}