// ライブラリ関連
import { Container, Fade, Grid, Typography } from "@mui/material";

// 型定義とかその辺
import { getAllBlogs, getAllCategories } from "@/libs/client";

// コンポーネント
import { CategoryList } from "@/components/CategoryList";
import { BlogCard } from "@/components/BlogCard";

/**
 * ブログの一覧ページ
 * @returns
 */
export default async function Page() {
  const blogs = await getAllBlogs();
  const categories = await getAllCategories();

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {/* <BlogSwiper blogs={blogs} /> */}
        <Typography
          variant="h3"
          component="h3"
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px",
            textDecorationThickness: "2px",
          }}>
          Blogs
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {blogs.map((content, index: number) => (
              <Grid item xs={12} sm={12} md={6} key={content.id}>
                <Fade in={true} timeout={(index + 1) * 1000}>
                  <BlogCard content={content} />
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <CategoryList contents={categories} />
        </Grid>
      </Grid>
    </Container>
  );
}
