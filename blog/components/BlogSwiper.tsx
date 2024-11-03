import { CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Navigation,
  Pagination as SwiperPagenation,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { client, getAllBlogs } from '@/libs/client';
import { Blog } from '@/types/blog';

export const BlogSwiper = async (blogs: any) => {
  // const blogs = await getAllBlogs();

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

  return (
    <>
      <Typography
        component="h3"
        variant="h3"
        sx={{ paddingTop: '20px', paddingBottom: '20px' }}
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px', // 下線とテキストの間の距離を調整
          textDecorationThickness: '2px', // 下線の太さを調整
        }}
      >
        Read Next
      </Typography>
      <Swiper
        key={blogs?.length}
        modules={[Navigation, SwiperPagenation, Autoplay]}
        breakpoints={slideSettings} // slidesPerViewを指定
        slidesPerView={'auto'} // ハイドレーションエラー対策
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
        className="slideWrapper"
      >
        {blogs?.map((content: any, index: number) => (
          <SwiperSlide key={index}>
            {content.eyecatch ? (
              <Link href={`/blog/${content.id}`}>
                <>
                  <CardMedia
                    component="img"
                    height="350"
                    image={content.eyecatch?.url}
                    alt={content.title}
                    sx={{
                      transition: 'transform 0.5s ease-in-out',
                    }}
                  />
                </>
              </Link>
            ) : (
              <Link href={`/blog/${content.id}`}>
                <div
                  style={{
                    width: '500px',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ccc',
                  }}
                >
                  <p>No Image Available</p>
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
