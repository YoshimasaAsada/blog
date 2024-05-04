/**
 * microcmsとの繋ぎ込みのやつ
 */
import { Blog, BlogsInContents } from "@/types/blog";
import { createClient } from "microcms-js-sdk";

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

export const getAllBlogs = async () => {
  const data = await client.get<BlogsInContents>({
    endpoint: "blogs",
  });
  return data.contents;
};

export const getBlogById = async (params: any) => {
  const data = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: params.id,
  });
  return data;
};

export const getAllCategories = async () => {
  const data = await client.get<BlogsInContents>({
    endpoint: "categories",
  });
  return data.contents;
};

export const getBlogsFilterByCategoryId = async (params: any) => {
  const data = await client.get<BlogsInContents>({
    endpoint: "blogs",
    queries: {
      filters: `category[contains]${params.id}`,
    },
  });
  return data.contents;
};
