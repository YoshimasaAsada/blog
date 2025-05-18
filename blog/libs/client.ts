/**
 * microcmsとの繋ぎ込みのやつ
 */
import { Blog, BlogsInContents } from '@/types/blog';
import { CategoryInContents } from '@/types/category';
import { createClient } from 'microcms-js-sdk';

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

/**
 * Microcmsが用意しているfetchの雛形。
 */
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

/**
 * 全てのブログを取得
 * @returns
 */
export const getAllBlogs = async () => {
  const data = await client.getAllContents<BlogsInContents>({
    endpoint: 'blogs',
  });
  return data;
};

/**
 * ブログIDから該当するブログを取得
 * @param params ブログのID
 * @returns
 */
export const getBlogById = async (params: { id: string }) => {
  const data = await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId: params.id,
  });
  return data;
};

/**
 * 全てのカテゴリーを取得
 * @returns
 */
export const getAllCategories = async () => {
  const data = await client.getAllContents<CategoryInContents>({
    endpoint: 'categories',
  });
  return data;
};

/**
 * 特定のカテゴリーを持つブログを全て取得
 * @param params 検索したいカテゴリーのID
 * @returns
 */
export const getBlogsFilterByCategoryId = async (params: { id: string }) => {
  const data = await client.get<BlogsInContents>({
    endpoint: 'blogs',
    queries: {
      filters: `category[contains]${params.id}`,
    },
  });
  return data.contents;
};
