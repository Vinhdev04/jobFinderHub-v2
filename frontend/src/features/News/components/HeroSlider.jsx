// src/components/news/HeroSlider.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/HeroSlider.module.css';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            tag: 'Xu hướng',
            date: '15/01/2024',
            title: 'Xu hướng tuyển dụng thực tập sinh năm 2024: Những kỹ năng được săn đón nhất',
            excerpt:
                'Khảo sát từ hơn 500 doanh nghiệp cho thấy các kỹ năng công nghệ và tư duy phản biện đang là yếu tố quan trọng nhất khi tuyển dụng thực tập sinh...',
            author: 'Nguyễn Minh Anh',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
        },
        {
            tag: 'Câu chuyện thành công',
            date: '13/01/2024',
            title: 'Từ thực tập sinh đến nhân viên chính thức: Hành trình của Phương Anh tại FPT',
            excerpt:
                'Câu chuyện truyền cảm hứng về cách một sinh viên năm cuối đã chinh phục nhà tuyển dụng và trở thành nhân viên chính thức...',
            author: 'Lê Thị Hương',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800'
        },
        {
            tag: 'Mẹo nghề nghiệp',
            date: '12/01/2024',
            title: 'Cách viết CV thu hút nhà tuyển dụng trong 6 giây đầu tiên',
            excerpt:
                '90% nhà tuyển dụng quyết định xem CV chỉ trong 6 giây đầu. Làm thế nào để CV của bạn nổi bật trong khoảng thời gian ngắn ngủi đó?',
            author: 'Phạm Văn Minh',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className={styles.heroSlider}>
            <div className={styles.heroSlider__container}>
                <div className={styles.heroSlider__wrapper}>
                    {slides.map((slide, index) => (
                        <article
                            key={index}
                            className={`${styles.heroSlider__slide} ${
                                index === currentSlide
                                    ? styles['heroSlider__slide--active']
                                    : ''
                            }`}
                        >
                            <div className={styles.heroSlider__imageWrapper}>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className={styles.heroSlider__image}
                                />
                                <div className={styles.heroSlider__overlay} />
                            </div>
                            <div className={styles.heroSlider__content}>
                                <div className={styles.heroSlider__meta}>
                                    <span className={styles.heroSlider__tag}>
                                        {slide.tag}
                                    </span>
                                    <span className={styles.heroSlider__date}>
                                        {slide.date}
                                    </span>
                                </div>
                                <h2 className={styles.heroSlider__title}>
                                    {slide.title}
                                </h2>
                                <p className={styles.heroSlider__excerpt}>
                                    {slide.excerpt}
                                </p>
                                <div className={styles.heroSlider__authorInfo}>
                                    <div className={styles.heroSlider__avatar}>
                                        {slide.author.charAt(0)}
                                    </div>
                                    <span className={styles.heroSlider__author}>
                                        {slide.author}
                                    </span>
                                </div>
                                <button className={styles.heroSlider__readMore}>
                                    Đọc ngay <span>→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    className={`${styles.heroSlider__navBtn} ${styles['heroSlider__navBtn--prev']}`}
                    onClick={handlePrevSlide}
                    aria-label='Previous slide'
                >
                    ‹
                </button>
                <button
                    className={`${styles.heroSlider__navBtn} ${styles['heroSlider__navBtn--next']}`}
                    onClick={handleNextSlide}
                    aria-label='Next slide'
                >
                    ›
                </button>

                {/* Dots Indicator */}
                <div className={styles.heroSlider__dots}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.heroSlider__dot} ${
                                index === currentSlide
                                    ? styles['heroSlider__dot--active']
                                    : ''
                            }`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
