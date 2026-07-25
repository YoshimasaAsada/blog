// 型定義とかその辺
import { getAllBlogs, getAllCategories } from '@/libs/github';

// コンポーネント
import { BlogList } from '@/components/BlogList';

/**
 * ブログの一覧ページ
 * ビルド時にGitHubのObsidianリポジトリから記事を取得して表示する
 * @returns
 */
export default async function Page() {
  const blogs = await getAllBlogs();
  const categories = await getAllCategories();

  return <BlogList blogs={blogs} categories={categories} />;
}
