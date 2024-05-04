import { BlogCard } from "@/components/BlogCard";
import { CategoryList } from "@/components/CategoryList";
import { getAllCategories, getBlogsFilterByCategoryId } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

/**
 * ビルド時に詳細ページを作成させる
 * @returns
 */
export async function generateStaticParams() {
  const contents = await getAllCategories();
  const paths = contents.map((category: any) => {
    return { id: category.id };
  });
  return [...paths];
}

export default async function Page({ params }: { params: { id: string } }) {
  const blogs: Blog[] = await getBlogsFilterByCategoryId(params);

  console.log(blogs);
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
            {blogs.map((content: any) => (
              <Grid item xs={12} sm={6} key={content.id}>
                <BlogCard content={content} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <CategoryList />
        </Grid>
      </Grid>
    </Container>
  );
}
