import { getBlog } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { renderToc } from "../../../../libs/render-toc";
import TableOfContents from "@/components/TableOfContents";
import { CardTest } from "@/components/CardTest";
import "highlight.js/styles/github-dark.css";
import hljs, { HighlightResult } from "highlight.js";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Image from "next/image";
import * as cheerio from "cheerio";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const blog: Blog = await getBlog(params);
  const toc = await renderToc(blog.content);
  const $ = cheerio.load(blog.content);

  // ここでHydtrationWarning出てる
  // コードブロックのファイル名が入力されている場合の処理
  $("div[data-filename]").each((_, elm) => {
    $(elm).prepend(`<span>${$(elm).attr("data-filename")}</span>`);
  });

  // コードブロックのシンタックスハイライトを行う
  $("pre code").each((_, elm) => {
    const language = $(elm).attr("class") || "";
    let result: HighlightResult;
    if (language == "") {
      // 言語が入力なしの場合、自動判定
      result = hljs.highlightAuto($(elm).text());
    } else {
      // 言語が入力ありの場合、入力された言語で判定
      result = hljs.highlight($(elm).text(), {
        language: language.replace("language-", ""),
      });
    }
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  // 編集したHTMLを再設定
  blog.content = await $.html();

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {/* メインコンテンツ */}
          <Grid item xs={12} md={9}>
            <h1 className="title">{blog?.title}</h1>
            <Box paddingBottom="15px">
              <Grid container>
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
              </Grid>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ paddingTop: "5px" }}>
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
                sx={{ paddingTop: "5px" }}>
                <LocalOfferIcon />
                <Typography display="inline">関連：</Typography>
                {blog?.category.map((category: any, index: number) => (
                  <Chip
                    key={index}
                    label={category.name}
                    variant="outlined"
                    sx={{
                      color: "white", // テキスト色を黒に設定
                    }}
                  />
                ))}
              </Stack>
            </Box>
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardTest />
            <TableOfContents toc={toc} />
          </Grid>
        </Grid>
        {/* <BlogSwiper /> */}
      </Container>
    </>
  );
}
