// src/components/news/ArticleGrid.jsx
import React from 'react';
import ArticleCard from './ArticleCard';
import styles from '../styles/ArticleGrid.module.css';

const ArticleGrid = () => {
    const mockArticles = [
        {
            title: '10 câu hỏi phỏng vấn thường gặp và cách trả lời ấn tượng',
            excerpt:
                'Chuẩn bị kỹ càng cho buổi phỏng vấn với những câu hỏi phổ biến nhất...',
            category: 'Hướng dẫn',
            date: '14/01/2024',
            author: 'Trần Văn Bình',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600'
        },
        {
            title: 'Từ thực tập sinh đến nhân viên chính thức: Hành trình của Phương Anh tại FPT',
            excerpt:
                'Câu chuyện truyền cảm hứng về cách một sinh viên năm cuối đã chinh phục...',
            category: 'Câu chuyện thành công',
            date: '13/01/2024',
            author: 'Lê Thị Hương',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600'
        },
        {
            title: 'Cách viết CV thu hút nhà tuyển dụng trong 6 giây đầu tiên',
            excerpt:
                '90% nhà tuyển dụng quyết định xem CV chỉ trong 6 giây đầu...',
            category: 'Mẹo nghề nghiệp',
            date: '12/01/2024',
            author: 'Phạm Văn Minh',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600'
        },
        {
            title: 'Top 5 kỹ năng mềm cần thiết cho sinh viên mới ra trường',
            excerpt:
                'Ngoài kiến thức chuyên môn, kỹ năng mềm đóng vai trò quan trọng...',
            category: 'Phát triển bản thân',
            date: '11/01/2024',
            author: 'Nguyễn Thị Lan',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600'
        },
        {
            title: 'Làm thế nào để xây dựng mạng lưới quan hệ chuyên nghiệp từ khi còn là sinh viên?',
            excerpt:
                'Networking là chìa khóa mở ra nhiều cơ hội nghề nghiệp...',
            category: 'Phát triển bản thân',
            date: '11/01/2024',
            author: 'Hoàng Đức Anh',
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600'
        },
        {
            title: 'Khám phá văn hóa công ty qua góc nhìn của thực tập sinh',
            excerpt:
                'Văn hóa công ty ảnh hưởng lớn đến trải nghiệm làm việc của bạn...',
            category: 'Văn hóa công ty',
            date: '10/01/2024',
            author: 'Đặng Thùy Dung',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600'
        }
    ];

    return (
        <section className={styles.articleGrid}>
            <div className={styles.articleGrid__container}>
                <h2 className={styles.articleGrid__heading}>
                    Bài viết mới nhất
                </h2>
                <div className={styles.articleGrid__grid}>
                    {mockArticles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
                <button className={styles.articleGrid__loadMore}>
                    Xem thêm bài viết
                </button>
            </div>
        </section>
    );
};

export default ArticleGrid;
