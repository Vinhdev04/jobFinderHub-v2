import HeroArticle from '@features/News/components/HeroArticle';
import ArticleGrid from '@features/News/components/ArticleGrid';
import Newsletter from '@features/News/components/Newsletter';
import CategoryTabs from '@features/News/components/CategoryTabs';
import HeroSlider from '@features/News/components/HeroSlider';
import { useState } from 'react';
export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    return (
        <>
            <HeroSlider />
            <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            <ArticleGrid category={activeCategory} />
            <Newsletter />
        </>
    );
}
