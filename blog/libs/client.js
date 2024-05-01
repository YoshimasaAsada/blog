/**
 * microcmsとの繋ぎ込みのやつ
 */
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

// export const getAllBlogs = async (searchCategory) => {
//   if (searchCategory) {
//     const blogs = await client.get({
//       endpoint: "blogs",
//       queries: {
//         filters: `category[contains]${searchCategory}`,
//       },
//     });
//     return blogs;
//   } else {
//     const blogs = await client.get({
//       endpoint: "blogs",
//     });
//     return blogs;
//   }
// };

// export const getAllCategories = async () => {
//   const data = await client.get({
//     endpoint: "categories",
//   });
//   return data.contents;
// };

export const getBlog = async (params) => {
  const data = await client.getListDetail({
    endpoint: "blogs",
    contentId: params.id,
  });
  return data;
};
