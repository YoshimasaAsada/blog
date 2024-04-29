"use client";
import { useEffect, useRef, useState } from "react";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { renderToc } from "../../../../libs/render-toc";
import TableOfContents from "@/components/TableOfContents";
import { CardTest } from "@/components/CardTest";
import "highlight.js/styles/github-dark.css";
import hljs, { HighlightResult } from "highlight.js";
import { load } from "cheerio";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Image from "next/image";
import Loading from "@/app/loading";
import DOMPurify from "dompurify";

interface PageProps {
  params: {
    id: string;
  };
}

interface TocItem {
  text: string;
  id: string;
  level: number;
}

export default function Page({ params }: PageProps) {
  const tocContainerRef = useRef(null);

  const [blog, setBlog] = useState<Blog>();
  const [toc, setToc] = useState<TocItem[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.getListDetail({
          endpoint: "blogs",
          contentId: params.id,
        });
        setBlog(data);

        const toc = renderToc(data.content);
        setToc(toc);
        const $ = load(data.content);

        $("div[data-filename]").each((_, elm) => {
          $(elm).prepend(`<span>${$(elm).attr("data-filename")}</span>`);
        });

        $("pre code").each((_, elm) => {
          const language = $(elm).attr("class") || "";
          let result: HighlightResult;
          try {
            if (language == "") {
              result = hljs.highlightAuto($(elm).text());
            } else {
              result = hljs.highlight($(elm).text(), {
                language: language.replace("language-", ""),
              });
            }
            $(elm).html(result.value);
            $(elm).addClass("hljs");
          } catch (innerError) {
            console.error("Syntax highlight failed", innerError);
          }
        });

        const cleanHTML = DOMPurify.sanitize($.html());
        data.content = cleanHTML;
      } catch (error) {
        console.error("Failed to fetch or process blog data", error);
        setError("Failed to load blog data.");
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    if (blog) {
      try {
        hljs.highlightAll();
      } catch (error) {
        console.error("Highlighting failed", error);
      }
    }
  }, [blog]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <Loading />;
  }

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
                    backgroundColor: "#fff", // Set the background color to white
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
                <Typography>投稿日：</Typography>
                {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ paddingTop: "5px" }}>
                <LocalOfferIcon />
                <Typography display="inline">関連：</Typography>
                {blog?.category.map((category, index) => (
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
            <CardTest tocContainerRef={tocContainerRef} />
            <TableOfContents toc={toc} containerRef={tocContainerRef} />
          </Grid>
        </Grid>
        {/* <BlogSwiper /> */}
      </Container>
    </>
  );
}
