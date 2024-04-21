"use client";
import { useEffect, useState } from "react";
import { client } from "@/libs/client";
import Link from "next/link";
import { Blog } from "@/types/blog";
import {
  Card,
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
  const itemsPerPage = 6; // 1ページあたりのアイテム数
  // 2. データの分割
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs?.slice(indexOfFirstItem, indexOfLastItem);
  // 3. ページネーションコントロール
  const paginate = (_: any, value: number) => {
    setCurrentPage(value);
  };

  console.log(blogs);

  return (
    <Container>
      <h1 style={{ paddingBottom: "20px", paddingTop: "20px" }}>ブログ一覧</h1>
      <Grid container spacing={2}>
        {currentItems?.map((content) => (
          <Grid key={content.id} item xs={4} sm={4} md={4} lg={4}>
            <Link href={`/blog/${content.id}`}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: 300,
                  "&:hover": {
                    backgroundColor: "#f5f5f5", // ホバー時の背景色を変更
                    "& .MuiCardMedia-root": {
                      transform: "scale(1.05)",
                      transition: "transform 0.2s ease-in-out",
                    },
                  },
                }}>
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
                  <Typography gutterBottom variant="h6" component="div">
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    投稿日：
                    {new Date(content.publishedAt).toLocaleDateString("ja-JP")}
                  </Typography>
                  <Typography color="text.secondary" display="inline">
                    タグ：
                  </Typography>
                  {content.category.map((category, index) => (
                    <Chip
                      key={index}
                      label={category.name}
                      variant="outlined"
                    />
                  ))}
                </CardContent>
              </Card>
            </Link>
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
              color: "white", // 非アクティブなアイテムのテキスト色
              backgroundColor: "transparent", // 非アクティブなアイテムの背景色
              "&:hover": {
                backgroundColor: "gray", // ホバー時の背景色
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "white", // 選択されたアイテムのテキスト色
              backgroundColor: "gray", // 選択されたアイテムの背景色
            },
          }}
        />
      </Stack>
    </Container>
  );
}
