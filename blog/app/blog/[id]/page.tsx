"use client";
import { useEffect, useRef, useState } from "react";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import { Container, Grid } from "@mui/material";
import { renderToc } from "../../../libs/render-toc";
import TableOfContents from "@/components/TableOfContents";
import { CardTest } from "@/components/CardTest";
import "highlight.js/styles/atom-one-dark.css";
import hljs, { HighlightResult } from "highlight.js";
import { load } from "cheerio";
import parse from "html-react-parser";

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
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
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
