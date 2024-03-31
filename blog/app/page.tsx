"use client";
import { useEffect, useState } from "react";
// import styles from "./page.module.css";
import { client } from "@/libs/client";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

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
      {blogs.map((content) => (
        <div>
          <Link href={`/blog/${content.id}`} key={content.id}>
            {content.title}
          </Link>
        </div>
      ))}
    </main>
  );
}
