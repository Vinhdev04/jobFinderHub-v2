// src/components/news/ArticleGrid.jsx
import React, { useState, useMemo } from 'react';
import ArticleCard from './ArticleCard';
import styles from '../styles/ArticleGrid.module.css';

const ArticleGrid = ({ category }) => {
    const [visibleCount, setVisibleCount] = useState(6);

    // Mock data với categories
    const allArticles = [
        {
            id: 1,
            title: '10 câu hỏi phỏng vấn thường gặp và cách trả lời ấn tượng',
            excerpt:
                'Chuẩn bị kỹ càng cho buổi phỏng vấn với những câu hỏi phổ biến nhất...',
            category: 'Hướng dẫn',
            date: '14/01/2024',
            author: 'Trần Văn Bình',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600'
        },
        {
            id: 2,
            title: 'Từ thực tập sinh đến nhân viên chính thức: Hành trình của Phương Anh tại FPT',
            excerpt:
                'Câu chuyện truyền cảm hứng về cách một sinh viên năm cuối đã chinh phục...',
            category: 'Câu chuyện thành công',
            date: '13/01/2024',
            author: 'Lê Thị Hương',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600'
        },
        {
            id: 3,
            title: 'Cách viết CV thu hút nhà tuyển dụng trong 6 giây đầu tiên',
            excerpt:
                '90% nhà tuyển dụng quyết định xem CV chỉ trong 6 giây đầu...',
            category: 'Mẹo nghề nghiệp',
            date: '12/01/2024',
            author: 'Phạm Văn Minh',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600'
        },
        {
            id: 4,
            title: 'Xu hướng tuyển dụng thực tập sinh năm 2024',
            excerpt:
                'Khảo sát từ hơn 500 doanh nghiệp cho thấy các kỹ năng công nghệ và tư duy phản biện...',
            category: 'Xu hướng',
            date: '15/01/2024',
            author: 'Nguyễn Minh Anh',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600'
        },
        {
            id: 5,
            title: 'Top 5 kỹ năng mềm cần thiết cho sinh viên mới ra trường',
            excerpt:
                'Ngoài kiến thức chuyên môn, kỹ năng mềm đóng vai trò quan trọng...',
            category: 'Hướng dẫn',
            date: '11/01/2024',
            author: 'Nguyễn Thị Lan',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600'
        },
        {
            id: 6,
            title: 'Làm thế nào để xây dựng mạng lưới quan hệ chuyên nghiệp?',
            excerpt:
                'Networking là chìa khóa mở ra nhiều cơ hội nghề nghiệp...',
            category: 'Mẹo nghề nghiệp',
            date: '11/01/2024',
            author: 'Hoàng Đức Anh',
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600'
        },
        {
            id: 7,
            title: 'Khám phá văn hóa công ty qua góc nhìn của thực tập sinh',
            excerpt:
                'Văn hóa công ty ảnh hưởng lớn đến trải nghiệm làm việc của bạn...',
            category: 'Câu chuyện thành công',
            date: '10/01/2024',
            author: 'Đặng Thùy Dung',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600'
        },
        {
            id: 8,
            title: 'Công nghệ AI đang thay đổi cách tuyển dụng như thế nào?',
            excerpt:
                'Trí tuệ nhân tạo đang cách mạng hóa quy trình tuyển dụng hiện đại...',
            category: 'Xu hướng',
            date: '09/01/2024',
            author: 'Võ Quốc Bảo',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600'
        },
        {
            id: 9,
            title: 'Bí quyết vượt qua vòng phỏng vấn nhóm',
            excerpt:
                'Phỏng vấn nhóm đòi hỏi kỹ năng làm việc team và giao tiếp hiệu quả...',
            category: 'Hướng dẫn',
            date: '08/01/2024',
            author: 'Trần Thu Hà',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600'
        }
    ];

    // Filter articles based on category
    const filteredArticles = useMemo(() => {
        if (category === 'Tất cả') {
            return allArticles;
        }
        return allArticles.filter((article) => article.category === category);
    }, [category, allArticles]);

    // Get visible articles
    const visibleArticles = filteredArticles.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <section className={styles.articleGrid}>
            <div className={styles.articleGrid__container}>
                <div className={styles.articleGrid__header}>
                    <h2 className={styles.articleGrid__heading}>
                        {category === 'Tất cả'
                            ? 'Bài viết mới nhất'
                            : `${category} (${filteredArticles.length})`}
                    </h2>
                    <p className={styles.articleGrid__subheading}>
                        {filteredArticles.length > 0
                            ? `Hiển thị ${visibleArticles.length} / ${filteredArticles.length} bài viết`
                            : 'Chưa có bài viết nào'}
                    </p>
                </div>

                {filteredArticles.length > 0 ? (
                    <>
                        <div className={styles.articleGrid__grid}>
                            {visibleArticles.map((article) => (
                                <ArticleCard key={article.id} {...article} />
                            ))}
                        </div>

                        {visibleCount < filteredArticles.length && (
                            <button
                                className={styles.articleGrid__loadMore}
                                onClick={handleLoadMore}
                            >
                                Xem thêm bài viết (
                                {filteredArticles.length - visibleCount} còn
                                lại)
                            </button>
                        )}
                    </>
                ) : (
                    <div className={styles.articleGrid__empty}>
                        <div className={styles.articleGrid__emptyIcon}>📝</div>
                        <h3 className={styles.articleGrid__emptyTitle}>
                            Chưa có bài viết
                        </h3>
                        <p className={styles.articleGrid__emptyText}>
                            Hiện tại chưa có bài viết nào trong danh mục này.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArticleGrid;
