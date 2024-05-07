import { getAllBlogs } from "@/libs/client";
import { Container, Fade, Grid, Typography } from "@mui/material";
import { CategoryList } from "@/components/CategoryList";
import { BlogCard } from "@/components/BlogCard";

export default async function Page() {
  const blogs = await getAllBlogs();

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
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {blogs.map((content, index: number) => (
              <Grid item xs={12} sm={6} key={content.id}>
                <Fade in={true} timeout={(index + 1) * 1000}>
                  <BlogCard content={content} />
                </Fade>
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
