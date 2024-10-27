import { client, getAllBlogs } from '@/libs/client'
import { Blog } from '@/types/blog'
import type { MetadataRoute } from 'next'

/**
 * サイトマップ作成用の関数。
 * build時に1回通してサイトマップを作成。
 * @returns
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const _lastModified = new Date()

  const staticPage = [
    {
      url: 'https://yasdtech.com/profile',
      lastModified: _lastModified,
    },
    {
      url: 'https://yasdtech.com/privacy_poricy',
      lastModified: _lastModified,
    },
    {
      url: 'https://yasdtech.com/contact',
      lastModified: _lastModified,
    },
    {
      url: 'https://yasdtech.com/blog',
      lastModified: _lastModified,
    },
  ]

  const allBlogs = await getAllBlogs()

  // 記事一覧ページ
  const blogs = allBlogs.map((blog: Blog) => ({
    url: `https://yasdtech.com/blog/${blog.id}`,
    lastModified: blog.updatedAt,
  }))

  return [...blogs, ...staticPage]
}
