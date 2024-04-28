// import { MetadataRoute } from "next";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseURL = process.env.BASE_URL || ""; // URLは.envに記載
//   const lastModified = new Date();

//   const staticPaths = [
//     {
//       url: baseURL,
//       lastModified,
//     },
//   ];

//   return [...staticPaths];
// }

import { client } from "@/libs/client";

export default async function sitemap() {
  const allBlogs = await client.get({
    endpoint: "blogs",
  });

  // 記事一覧ページ
  const blogs = allBlogs.contents.map((blog: any) => ({
    url: `https://yasdtech.com/blogs/${blog.id}`,
    lastModified: blog.createdAt,
  }));

  // その他のページ
  const routes = ["", "/search"].map((route) => ({
    url: `https://yasdtech.com${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogs];
}
