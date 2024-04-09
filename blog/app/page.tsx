"use client";
import { useEffect, useState } from "react";
// import styles from "./page.module.css";
import { client } from "@/libs/client";
import Link from "next/link";
import { Blog } from "@/types/blog";

export default function Home() {
  // const [blogs, setBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await client.get({
  //       endpoint: "blogs",
  //     });
  //     setBlogs(data.contents);
  //   };

  //   fetchData();
  // }, []);

  // console.log(blogs);

  return (
    <>
      <h1>test</h1>
    </>
  );
}
