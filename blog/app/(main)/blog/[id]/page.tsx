import { getAllBlogs, getBlog } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { renderToc } from "../../../../libs/render-toc";
import TableOfContents from "@/components/TableOfContents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import * as cheerio from "cheerio";
import { getHighlighter } from "shiki";
import SyncIcon from "@mui/icons-material/Sync";

/**
 * ビルド時に詳細ページを作成させる
 * @returns
 */
export async function generateStaticParams() {
  const { contents } = await getAllBlogs();
  const paths = contents.map((blog: any) => {
    return { id: blog.id };
  });
  return [...paths];
}

export default async function Page({ params }: { params: { id: string } }) {
  const blog: Blog = await getBlog(params);
  const toc = renderToc(blog.content);

  const highlighter = await getHighlighter({
    themes: ["slack-dark"],
    langs: ["tsx", "shell", "typescript"],
  });

  const $ = cheerio.load(blog.content);

  // コードブロックのファイル名が入力されている場合の処理
  $("div[data-filename]").each((_, elm) => {
    $(elm).prepend(`<span>${$(elm).attr("data-filename")}</span>`);
  });

  // コードブロックのシンタックスハイライトを行う
  $("pre code").each((_, elm) => {
    let language = $(elm).attr("class")?.split("language-")[1] || "";
    console.log(language);
    const codeText = $(elm).text();
    const html = highlighter.codeToHtml(codeText, {
      lang: language,
      theme: "slack-dark",
    });
    // 直接親の <pre> タグに HTML を挿入し、不要な <code> タグを取り除く
    $(elm).parent().replaceWith(html);
  });

  return (
    <>
      <Container>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ paddingTop: "5px" }}>
            {blog?.category.map((category: any, index: number) => (
              <Chip
                key={index}
                label={category.name}
                variant="outlined"
                sx={{ color: "white" }}
              />
            ))}
          </Stack>
        </Box>
        <h1 className="title">{blog?.title}</h1>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ padding: "5px" }}>
            <CalendarMonthIcon />
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
          src={blog?.eyecatch.url}
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
              dangerouslySetInnerHTML={{ __html: $.html() }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TableOfContents toc={toc} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
