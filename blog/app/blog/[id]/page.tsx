"use client";
import { useEffect, useRef, useState } from "react";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { renderToc } from "../../../libs/render-toc";
import TableOfContents from "@/components/TableOfContents";
import { CardTest } from "@/components/CardTest";
import "highlight.js/styles/github-dark.css";
import hljs, { HighlightResult } from "highlight.js";
import { load } from "cheerio";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

interface TocItem {
  text: string;
  id: string;
  level: number; // Include hierarchy level
}

export default function Page({ params }: PageProps) {
  const tocContainerRef = useRef(null);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.getListDetail({
        endpoint: "blogs",
        contentId: params.id,
      });
      setBlog(data);

      const toc = renderToc(data.content);
      setToc(toc);
      const $ = load(data.content);

      // コードブロックのファイル名が入力されている場合の処理
      $("div[data-filename]").each((_, elm) => {
        // data-filename属性の値を持つspanを
        // <div data-filename="{入力したファイル名}">の最初の子要素として追加
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
      data.content = $.html();
    };

    if (params && params.id) {
      fetchData();
    }
  }, [params]);

  useEffect(() => {
    // コンテンツがDOMに挿入された後にハイライトを適用
    hljs.highlightAll();
  }, [blog]); // blogの状態が更新された後に実行

  return (
    <main>
      <Container>
        <Grid container spacing={2}>
          {/* メインコンテンツ */}
          <Grid item xs={12} md={9}>
            <h1 className="title">{blog?.title}</h1>
            <Grid container>
              <Image
                style={{
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  width: "100%",
                  height: "100%",
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
              {new Date(blog?.publishedAt).toLocaleDateString("ja-JP")}
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
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
          </Grid>
          {/* TOCサイドバー */}
          <Grid item xs={12} md={3}>
            <CardTest tocContainerRef={tocContainerRef} />
            <TableOfContents toc={toc} containerRef={tocContainerRef} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
