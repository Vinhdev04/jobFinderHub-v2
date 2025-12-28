// src/pages/ArticleDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './NewDetailPage.module.css';

const NewDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock article data (thực tế sẽ fetch từ API)
    const article = {
        id: id,
        title: '10 câu hỏi phỏng vấn thường gặp và cách trả lời ấn tượng',
        category: 'Hướng dẫn',
        date: '14/01/2024',
        author: 'Trần Văn Bình',
        readTime: '5 phút đọc',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200',
        content: `
            <h2>Giới thiệu</h2>
            <p>Phỏng vấn xin việc là một trong những bước quan trọng nhất trong quá trình tìm kiếm việc làm. 
            Chuẩn bị kỹ lưỡng cho các câu hỏi phỏng vấn sẽ giúp bạn tự tin hơn và tăng cơ hội thành công.</p>
            
            <h2>1. Hãy giới thiệu về bản thân</h2>
            <p>Đây là câu hỏi mở màn phổ biến nhất. Hãy chuẩn bị một bản giới thiệu ngắn gọn khoảng 2-3 phút, 
            tập trung vào học vấn, kinh nghiệm và những điểm mạnh liên quan đến vị trí ứng tuyển.</p>
            
            <h3>Cách trả lời hiệu quả:</h3>
            <ul>
                <li>Bắt đầu với thông tin cơ bản (tên, trường học)</li>
                <li>Nêu kinh nghiệm và kỹ năng liên quan</li>
                <li>Kết thúc bằng lý do bạn quan tâm đến vị trí này</li>
            </ul>
            
            <h2>2. Tại sao bạn muốn làm việc tại công ty chúng tôi?</h2>
            <p>Câu hỏi này đánh giá sự nghiên cứu và quan tâm của bạn đối với công ty. 
            Hãy tìm hiểu kỹ về công ty trước khi phỏng vấn.</p>
            
            <h2>3. Điểm mạnh và điểm yếu của bạn là gì?</h2>
            <p>Với điểm mạnh, hãy nêu những kỹ năng liên quan đến công việc. 
            Với điểm yếu, hãy chọn một điểm yếu thực tế nhưng không quá ảnh hưởng đến công việc, 
            và quan trọng là bạn đang cố gắng khắc phục nó như thế nào.</p>
            
            <h2>Kết luận</h2>
            <p>Chuẩn bị kỹ càng cho các câu hỏi phỏng vấn sẽ giúp bạn tự tin và ghi điểm với nhà tuyển dụng. 
            Hãy luyện tập trước gương hoặc với bạn bè để hoàn thiện kỹ năng phỏng vấn của mình.</p>
        `,
        tags: ['Phỏng vấn', 'Kỹ năng', 'Tìm việc', 'CV']
    };

    const relatedArticles = [
        {
            id: 2,
            title: 'Cách viết CV thu hút nhà tuyển dụng',
            category: 'Mẹo nghề nghiệp',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400'
        },
        {
            id: 3,
            title: 'Top 5 kỹ năng mềm cần thiết',
            category: 'Hướng dẫn',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400'
        }
    ];

    return (
        <div className={styles.articleDetail}>
            {/* Breadcrumb */}
            <div className={styles.articleDetail__breadcrumb}>
                <div className={styles.articleDetail__container}>
                    <button
                        onClick={() => navigate('/news')}
                        className={styles.articleDetail__backBtn}
                    >
                        ← Quay lại
                    </button>
                    <span className={styles.articleDetail__breadcrumbText}>
                        Tin tức / {article.category}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <article className={styles.articleDetail__main}>
                <div className={styles.articleDetail__container}>
                    <div className={styles.articleDetail__content}>
                        {/* Header */}
                        <header className={styles.articleDetail__header}>
                            <span className={styles.articleDetail__category}>
                                {article.category}
                            </span>
                            <h1 className={styles.articleDetail__title}>
                                {article.title}
                            </h1>
                            <div className={styles.articleDetail__meta}>
                                <div className={styles.articleDetail__author}>
                                    <div
                                        className={styles.articleDetail__avatar}
                                    >
                                        {article.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div
                                            className={
                                                styles.articleDetail__authorName
                                            }
                                        >
                                            {article.author}
                                        </div>
                                        <div
                                            className={
                                                styles.articleDetail__date
                                            }
                                        >
                                            {article.date} • {article.readTime}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.articleDetail__share}>
                                    <button
                                        className={
                                            styles.articleDetail__shareBtn
                                        }
                                    >
                                        📤 Chia sẻ
                                    </button>
                                    <button
                                        className={
                                            styles.articleDetail__saveBtn
                                        }
                                    >
                                        🔖 Lưu
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className={styles.articleDetail__imageWrapper}>
                            <img
                                src={article.image}
                                alt={article.title}
                                className={styles.articleDetail__image}
                            />
                        </div>

                        {/* Article Body */}
                        <div
                            className={styles.articleDetail__body}
                            dangerouslySetInnerHTML={{
                                __html: article.content
                            }}
                        />

                        {/* Tags */}
                        <div className={styles.articleDetail__tags}>
                            {article.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={styles.articleDetail__tag}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.articleDetail__sidebar}>
                        <div className={styles.articleDetail__sidebarSticky}>
                            <h3 className={styles.articleDetail__sidebarTitle}>
                                Bài viết liên quan
                            </h3>
                            {relatedArticles.map((related) => (
                                <div
                                    key={related.id}
                                    className={
                                        styles.articleDetail__relatedCard
                                    }
                                    onClick={() =>
                                        navigate(`/news/${related.id}`)
                                    }
                                >
                                    <img
                                        src={related.image}
                                        alt={related.title}
                                        className={
                                            styles.articleDetail__relatedImage
                                        }
                                    />
                                    <div
                                        className={
                                            styles.articleDetail__relatedContent
                                        }
                                    >
                                        <span
                                            className={
                                                styles.articleDetail__relatedCategory
                                            }
                                        >
                                            {related.category}
                                        </span>
                                        <h4
                                            className={
                                                styles.articleDetail__relatedTitle
                                            }
                                        >
                                            {related.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </article>
        </div>
    );
};

export default NewDetailPage;
