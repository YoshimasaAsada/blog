"use client";
import { useEffect, useState } from "react";
import { client } from "@/libs/client";
import Link from "next/link";
import { Blog } from "@/types/blog";
import { Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { CategoryList } from "@/components/CategoryList";
import { BlogCard } from "@/components/BlogCard";
import { BlogSwiper } from "@/components/BlogSwiper";

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


  return (
    <Container>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {/* <BlogSwiper blogs={blogs} /> */}
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
