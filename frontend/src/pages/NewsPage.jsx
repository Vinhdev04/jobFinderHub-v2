import HeroArticle from '@features/News/components/HeroArticle';
import ArticleGrid from '@features/News/components/ArticleGrid';
import Newsletter from '@features/News/components/Newsletter';
import CategoryTabs from '@features/News/components/CategoryTabs';
import HeroSlider from '@features/News/components/HeroSlider';
export default function NewsPage() {
    return (
        <>
            <HeroSlider />
            <CategoryTabs />
            <ArticleGrid />
            <Newsletter />
        </>
    );
}
