"use client";
import { useEffect, useState } from "react";
import { client } from "@/libs/client";
import parse from "html-react-parser";
import { Blog } from "@/types/blog";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [blog, setBlog] = useState<Blog | null>(null); // 初期値を空のオブジェクトに

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.getListDetail({
        endpoint: "blogs",
        contentId: params.id, // propsから適切にアクセス
      });
      setBlog(data); // レスポンスの扱いを修正
    };

    if (params && params.id) {
      fetchData();
    }
  }, [params.id]); // 依存配列を修正

  return (
    <main>
      <h1>{blog?.title}</h1>
      {/* blog.contentが存在し、文字列の場合のみparseを実行 */}
      <div>{blog?.content ? parse(blog?.content) : null}</div>
    </main>
  );
}
