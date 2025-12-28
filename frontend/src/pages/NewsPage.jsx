
import HeroArticle from '@features/News/components/HeroArticle';
import ArticleGrid from '@features/News/components/ArticleGrid';
import Newsletter from '@features/News/components/Newsletter';
import CategoryTabs from '@features/News/components/CategoryTabs';
export default function NewsPage() {
  return (
    <>
      <HeroArticle />
      <CategoryTabs />
      <ArticleGrid />
      <Newsletter />
    </>
  );
}