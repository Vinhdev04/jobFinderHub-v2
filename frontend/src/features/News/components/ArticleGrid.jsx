// src/components/news/ArticleGrid.jsx
import ArticleCard from './ArticleCard';
import styles from '../styles/ArticleGrid.module.css';
import newsImage1 from '@assets/images/news-01.png';
import newsImage2 from '@assets/images/news-02.png';
import newsImage3 from '@assets/images/news-03.png';
import newsImage4 from '@assets/images/news-04.png';
import newsImage5 from '@assets/images/news-05.png';
import newsImage6 from '@assets/images/news-06.png';

const mockArticles = [
  {
    title: "10 câu hỏi phỏng vấn thường gặp và cách trả lời ấn tượng",
    excerpt: "Chuẩn bị kỹ càng cho buổi phỏng vấn với những câu hỏi phổ biến nhất...",
    category: "Hướng dẫn",
    date: "14/01/2024",
    author: "Trần Văn Bình",
    image: newsImage4
  },
  {
    title: "Từ thực tập sinh đến nhân viên chính thức: Hành trình của Phương Anh tại FPT",
    excerpt: "Câu chuyện truyền cảm hứng về cách một sinh viên năm cuối đã chinh phục...",
    category: "Câu chuyện thành công",
    date: "13/01/2024",
    author: "Lê Thị Hương",
    image: newsImage2
  },
  {
    title: "Cách viết CV thu hút nhà tuyển dụng trong 6 giây đầu tiên",
    excerpt: "90% nhà tuyển dụng quyết định xem CV chỉ trong 6 giây đầu...",
    category: "Mẹo nghề nghiệp",
    date: "12/01/2024",
    author: "Phạm Văn Minh",
    image: newsImage3
  },
  {
    title: "Top 5 kỹ năng mềm cần thiết cho sinh viên mới ra trường",
    excerpt: "Ngoài kiến thức chuyên môn, kỹ năng mềm đóng vai trò quan trọng...",
    category: "Phát triển bản thân",
    date: "11/01/2024",
     author: "Nguyễn Thị Lan",
    image: newsImage5
  },
  {
    title: "Làm thế nào để xây dựng mạng lưới quan hệ chuyên nghiệp từ khi còn là sinh viên?",    
    excerpt: "Ngoài kiến thức chuyên môn, kỹ năng mềm đóng vai trò quan trọng...",
    category: "Phát triển bản thân",
    date: "11/01/2024",
     author: "Hoàng Đức Anh",
    image: newsImage6
  },
  {
    title: "Khám phá văn hóa công ty qua góc nhìn của thực tập sinh",
    excerpt: "Văn hóa công ty ảnh hưởng lớn đến trải nghiệm làm việc của bạn...",
    category: "Văn hóa công ty",
    date: "10/01/2024", 
     author: "Đặng Thùy Dung",
    image: newsImage2
  }
];

export default function ArticleGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Bài viết mới nhất</h2>
        <div className={styles.grid}>
          {mockArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
        <button className={styles.loadMore}>Xem thêm bài viết</button>
      </div>
    </section>
  );
}