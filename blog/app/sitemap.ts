import { client } from "@/libs/client";

export default async function sitemap() {
  const _lastModified = new Date();

  const staticPage = [
    {
      url: "https://yasdtech.com/profile",
      lastModified: _lastModified,
    },
    {
      url: "https://yasdtech.com/privacy_poricy",
      lastModified: _lastModified,
    },
    {
      url: "https://yasdtech.com/contact",
      lastModified: _lastModified,
    },
  ];

  const allBlogs = await client.get({
    endpoint: "blogs",
  });

  // 記事一覧ページ
  const blogs = allBlogs.contents.map((blog: any) => ({
    url: `https://yasdtech.com/blog/${blog.id}`,
    lastModified: blog.createdAt,
  }));

  return [...blogs, ...staticPage];
}
