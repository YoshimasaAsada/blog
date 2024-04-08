"use client";
import { useEffect, useState } from "react";
import { client } from "@/libs/client";
import Link from "next/link";
import { Blog } from "@/types/blog";
import Image from "next/image";

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[] | null>([]); // 初期値を空のオブジェクトに

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.get({
        endpoint: "blogs",
      });
      setBlogs(data.contents);
    };

    fetchData();
  }, []);

  console.log(blogs);

  return (
    <main>
      {blogs?.map((content) => (
        <Link href={`/blog/${content.id}`} key={content.id}>
          {content.title}
          <Image
            className="rounded-lg"
            src={
              content.eyecatch?.url
              // ? content.eyecatch?.url
              // : `/images/no_image.jpeg`
            }
            alt=""
            width={1200}
            height={630}
            style={{ height: "100%" }}
          />
        </Link>
      ))}
    </main>
  );
}
