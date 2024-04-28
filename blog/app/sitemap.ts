import { client } from "@/libs/client";

export default async function sitemap() {
  const allBlogs = await client.get({
    endpoint: "blogs",
  });

  // 記事一覧ページ
  const blogs = allBlogs.contents.map((blog: any) => ({
    url: `https://yasdtech.com/blog/${blog.id}`,
    lastModified: blog.createdAt,
  }));

  return [...blogs];
}
