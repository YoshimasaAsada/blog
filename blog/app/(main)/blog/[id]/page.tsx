// ライブラリ関連
import Image from "next/image";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SyncIcon from "@mui/icons-material/Sync";

// 型定義とかその辺
import { getAllBlogs, getBlogById } from "@/libs/client";
import { Blog } from "@/types/blog";
import { renderToc } from "../../../../libs/render-toc";
import { applySyntaxHighlighting } from "@/utils/applySyntaxHighlighting";

// コンポーネント
import TableOfContents from "@/components/TableOfContents";

/**
 * ビルド時に詳細ページを作成させる
 * @returns
 */
export async function generateStaticParams() {
  const contents = await getAllBlogs();
  const paths = contents.map((blog: any) => {
    return { id: blog.id };
  });
  return [...paths];
}

export default async function Page({ params }: { params: { id: string } }) {
  const blog: Blog = await getBlogById(params);
  const toc = renderToc(blog.content);
  const highlightedContent = await applySyntaxHighlighting(blog.content);

  return (
    <Container>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ paddingTop: "5px" }}>
          {blog.category.map((category: any, index: number) => (
            <Chip
              key={index}
              label={category.name}
              variant="outlined"
              sx={{ color: "white" }}
            />
          ))}
        </Stack>
      </Box>
      <h1 className="title">{blog.title}</h1>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ padding: "5px" }}>
          <AccessTimeRoundedIcon />
          <Typography suppressHydrationWarning={true}>
            投稿日：
            {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ padding: "5px" }}>
          <SyncIcon />
          <Typography suppressHydrationWarning={true}>
            更新日：
            {new Date(blog.updatedAt).toLocaleDateString("ja-JP")}
          </Typography>
        </Stack>
      </Box>
      <Image
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
        }}
        src={blog.eyecatch.url}
        width={100}
        height={200}
        alt="Slider Image"
        sizes="(min-width: 1024px) 100vw, 60vw"
        className="slideImage"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box
            className="blog"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TableOfContents toc={toc} />
        </Grid>
      </Grid>
    </Container>
  );
}
