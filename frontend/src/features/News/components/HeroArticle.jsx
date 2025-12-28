
import styles from '../styles/HeroArticle.module.css';
import bannerNews from '@assets/images/banner-news.png';
export default function HeroArticle() {
  return (
    <article className={styles.hero}>
      <div className={styles.imageWrapper}>
        <img src={bannerNews} alt="Văn phòng hiện đại" />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.tag}>Xu hướng</span>
          <span className={styles.date}>15/01/2024</span>
        </div>
        <h2 className={styles.title}>
          Xu hướng tuyển dụng thực tập sinh năm 2024: Những kỹ năng được săn đón nhất
        </h2>
        <p className={styles.excerpt}>
          Khảo sát từ hơn 500 doanh nghiệp cho thấy các kỹ năng công nghệ và tư duy phản biện đang là yếu tố quan trọng nhất khi tuyển dụng thực tập sinh...
        </p>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>N</div>
          <span>Nguyễn Minh Anh</span>
        </div>
        <button className={styles.readMore}>
          Đọc ngay <span>→</span>
        </button>
      </div>
    </article>
  );
}