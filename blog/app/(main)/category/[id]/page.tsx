// ライブラリ関連
import { Container, Fade, Grid, Typography } from "@mui/material";
import Link from "next/link";

// 型定義とかその辺
import { getAllCategories, getBlogsFilterByCategoryId } from "@/libs/client";

// コンポーネント
import { BlogCard } from "@/components/BlogCard";
import { CategoryList } from "@/components/CategoryList";

/**
 * ビルド時に詳細ページを作成させる
 * @returns
 */
export async function generateStaticParams() {
  const contents = await getAllCategories();
  const paths = contents.map((category) => {
    return { id: category.id };
  });
  return [...paths];
}

/**
 * カテゴリー検索した時の
 * @param param0 カテゴリーのID
 * @returns
 */
export default async function Page({ params }: { params: { id: string } }) {
  const blogs = await getBlogsFilterByCategoryId(params);
  const categories = await getAllCategories();

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {/* <BlogSwiper blogs={blogs} /> */}
        <Grid item xs={7}>
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
        <Grid item xs={2} style={{ textAlign: "right" }}>
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
            {blogs.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="h5">
                  ヒットするコンテンツはありません
                </Typography>
              </Grid>
            ) : (
              blogs.map((content, index: number) => (
                <Grid item xs={12} sm={6} key={content.id}>
                  <Fade in={true} timeout={(index + 1) * 1000}>
                    <BlogCard content={content} />
                  </Fade>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CategoryList contents={categories} />
        </Grid>
      </Grid>
    </Container>
  );
}
