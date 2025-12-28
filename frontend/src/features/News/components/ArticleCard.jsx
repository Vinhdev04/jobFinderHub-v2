// src/components/news/ArticleCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ArticleCard.module.css';

const ArticleCard = ({ id, title, excerpt, category, date, author, image }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/news/${id}`);
    };

    const handleReadMore = (e) => {
        e.stopPropagation();
        navigate(`/news/${id}`);
    };

    return (
        <article className={styles.articleCard} onClick={handleCardClick}>
            <div className={styles.articleCard__imageWrapper}>
                <img
                    src={image || 'https://via.placeholder.com/400x250'}
                    alt={title}
                    className={styles.articleCard__image}
                />
            </div>
            <div className={styles.articleCard__content}>
                <div className={styles.articleCard__meta}>
                    <span className={styles.articleCard__category}>
                        {category}
                    </span>
                    <span className={styles.articleCard__date}>{date}</span>
                </div>
                <h3 className={styles.articleCard__title}>{title}</h3>
                <p className={styles.articleCard__excerpt}>{excerpt}</p>
                <div className={styles.articleCard__footer}>
                    <div className={styles.articleCard__authorInfo}>
                        <div className={styles.articleCard__avatar}>
                            {author.charAt(0)}
                        </div>
                        <span className={styles.articleCard__author}>
                            {author}
                        </span>
                    </div>
                    <button
                        className={styles.articleCard__readMore}
                        onClick={handleReadMore}
                    >
                        Đọc thêm →
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ArticleCard;
