"use client";
import { useEffect, useState } from "react";
import { client } from "@/libs/client";
import Link from "next/link";
import { Blog } from "@/types/blog";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  // Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// オプションをインポートする
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // 初期値を空のオブジェクトに

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.get({
        endpoint: "blogs",
      });
      setBlogs(data.contents);
    };

    fetchData();
  }, []);

  const slideSettings = {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };

  console.log(blogs);

  return (
    <Container>
      <Grid container spacing={2}>
        <h1 style={{ paddingBottom: "20px", paddingTop: "20px" }}>
          おすすめ記事
        </h1>
      </Grid>
      <Grid container spacing={2}>
        <Swiper
          key={blogs.length}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={slideSettings} // slidesPerViewを指定
          slidesPerView={"auto"} // ハイドレーションエラー対策
          centeredSlides={true} // スライドを中央に配置
          loop={true} // スライドをループさせる
          speed={1000} // スライドが切り替わる時の速度
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }} // スライド表示時間
          navigation // ナビゲーション（左右の矢印）
          pagination={{
            clickable: true,
          }} // ページネーション, クリックで対象のスライドに切り替わる
          className="slideWrapper">
          {blogs?.map((content, index) => (
            <SwiperSlide key={index}>
              {content.eyecatch ? (
                <Link href={`/blog/${content.id}`}>
                  <Image
                    src={content.eyecatch.url}
                    width={500}
                    height={300}
                    alt="Slider Image"
                    sizes="(min-width: 1024px) 100vw, 60vw"
                    className="slideImage"
                  />
                </Link>
              ) : (
                <Link href={`/blog/${content.id}`}>
                  <div
                    style={{
                      width: "500px",
                      height: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ccc",
                    }}>
                    <p>No Image Available</p>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <Grid
          container
          justifyContent="flex-end"
          style={{ paddingTop: "20px" }}>
          <Link href="/blog" passHref>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}>
              More Blogs
              <ArrowForwardIosIcon />
            </div>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
