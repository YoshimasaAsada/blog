"use client";
import { useEffect, useState } from "react";
import { client } from "@/libs/client";
import Link from "next/link";
import { Blog } from "@/types/blog";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import {
  Autoplay,
  Navigation,
  Pagination as SwiperPagenation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CategoryList } from "@/components/CategoryList";

interface PageProps {
  searchParams: {
    category: string;
  };
}

export default function Page(props: any) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      // クエリパラメータ `category` が存在するかどうかに基づいて条件分岐
      if (searchCategory) {
        const data = await client.get({
          endpoint: "blogs",
          queries: {
            filters: `category[contains]${searchCategory}`,
          },
        });
        console.log("query");
        setBlogs(data.contents);
        // console.log(data.contents);
      } else {
        const data = await client.get({
          endpoint: "blogs",
        });
        console.log("all");
        setBlogs(data.contents);
        console.log(data.contents);
      }
    };

    fetchData();
  }, [props]);

  // ページネーションの実装
  // 1. 状態の設定
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 1ページあたりのアイテム数
  // 2. データの分割
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs?.slice(indexOfFirstItem, indexOfLastItem);
  // 3. ページネーションコントロール
  const paginate = (_: any, value: number) => {
    setCurrentPage(value);
  };

  console.log(blogs);

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

  // TODO:あとでリファクタ
  const BlogCard = ({ content }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      // <Grid item xs={4} sm={4} md={4} lg={4}>
      <Link href={`/blog/${content.id}`}>
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            // maxWidth: 345,
            height: 300, // 高さを固定
            backgroundColor: isHovered ? "#000" : "#fff",
            color: isHovered ? "#fff" : "inherit",
            overflow: "hidden", // オーバーフローを隠す
            "&:hover .MuiCardMedia-root": {
              transform: "scale(1.05)",
              transition: "transform 0.2s ease-in-out",
            },
          }}>
          {isHovered ? (
            <>
              <Card
                sx={{
                  position: "relative",
                  filter: "grayscale(100%)",
                  height: "100%",
                }}>
                <CardActionArea
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 2,
                  }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "white", textAlign: "center" }}>
                    View More
                  </Typography>
                </CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={content.eyecatch?.url}
                  alt={content.title}
                  sx={{
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
                <CardContent
                  sx={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "60%",
                  }}>
                  <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary">
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    投稿日：
                    {new Date(content.publishedAt).toLocaleDateString("ja-JP")}
                  </Typography>
                  <Typography color="text.secondary" display="inline">
                    タグ：
                  </Typography>
                  {content.category.map((category: any, index: number) => (
                    <Chip
                      key={index}
                      label={category?.name}
                      variant="outlined"
                    />
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <CardMedia
                component="img"
                height="140"
                image={content.eyecatch?.url}
                alt={content.title}
                sx={{
                  transition: "transform 0.5s ease-in-out",
                }}
              />
              <CardContent
                sx={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "60%", // カードの残りの高さを埋める
                }}>
                <Typography variant="h6" component="div" color="text.secondary">
                  {content.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  投稿日：
                  {new Date(content.publishedAt).toLocaleDateString("ja-JP")}
                </Typography>
                <Typography color="text.secondary" display="inline">
                  タグ：
                </Typography>
                {content.category.map((category: any, index: number) => (
                  <Chip key={index} label={category?.name} variant="outlined" />
                ))}
              </CardContent>
            </>
          )}
        </Card>
      </Link>
      // </Grid>
    );
  };

  return (
    <Container>
      {/* <Typography
        component="h3"
        variant="h3"
        sx={{ paddingTop: "20px", paddingBottom: "20px" }}
        style={{
          textDecoration: "underline",
          textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
          textDecorationThickness: "2px", // 下線の太さを調整
        }}>
        Recommend
      </Typography>
      <Swiper
        key={blogs.length}
        modules={[Navigation, SwiperPagenation, Autoplay]}
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
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    image={content.eyecatch?.url}
                    alt={content.title}
                    sx={{
                      transition: "transform 0.5s ease-in-out",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "60%", // カードの残りの高さを埋める
                    }}>
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.secondary">
                      {content.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      投稿日：
                      {new Date(content.publishedAt).toLocaleDateString(
                        "ja-JP"
                      )}
                    </Typography>
                    <Typography color="text.secondary" display="inline">
                      タグ：
                    </Typography>
                    {content.category.map((category: any, index: any) => (
                      <Chip
                        key={index}
                        label={category?.name}
                        variant="outlined"
                      />
                    ))}
                  </CardContent>
                </>
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
      </Swiper> */}
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid item xs={6}>
          <Typography
            variant="h3"
            component="h3"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
              textDecorationThickness: "2px", // 下線の太さを調整
            }}>
            Blogs
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Link href="/blog" passHref>
            <div
              className="to-blog-animation"
              style={{
                cursor: "pointer",
              }}>
              All Blogs
            </div>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {currentItems?.map((content) => (
              <Grid item xs={12} sm={6} key={content.id}>
                <BlogCard content={content} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} justifyContent="center" direction="row">
            <Pagination
              count={Math.ceil(blogs?.length / itemsPerPage)} // 全ページ数
              page={currentPage}
              onChange={paginate}
              sx={{
                paddingTop: "8px",
                "& .MuiPaginationItem-root": {
                  color: "white",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  color: "white",
                  backgroundColor: "gray",
                },
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <CategoryList />
        </Grid>
      </Grid>
    </Container>
  );
}
