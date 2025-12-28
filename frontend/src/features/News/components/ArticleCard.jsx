// src/components/news/ArticleCard.jsx
import styles from '../styles/ArticleCard.module.css';

export default function ArticleCard({ title, excerpt, category, date, author, image }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image || 'https://via.placeholder.com/400x250'} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.author}>{author}</span>
          <button className={styles.readMore}>Đọc thêm →</button>
        </div>
      </div>
    </article>
  );
}