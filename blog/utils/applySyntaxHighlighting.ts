import { getHighlighter } from "shiki";
import * as cheerio from "cheerio";

/**
 * ブログコンテンツにシンタックスハイライトを当てる関数
 * @param content コンテンツのHTML丸ごと
 * @returns 
 */
export async function applySyntaxHighlighting(content: string) {
  const highlighter = await getHighlighter({
    themes: ["slack-dark"],
    langs: ["tsx", "shell", "typescript"],
  });
  const $ = cheerio.load(content);

  // コードブロックのファイル名が入力されている場合の処理
  $("div[data-filename]").each((_, elm) => {
    $(elm).prepend(`<span>${$(elm).attr("data-filename")}</span>`);
  });

  // コードブロックのシンタックスハイライトを行う
  $("pre code").each((_, elm) => {
    let language = $(elm).attr("class")?.split("language-")[1] || "";
    const codeText = $(elm).text();
    const html = highlighter.codeToHtml(codeText, {
      lang: language,
      theme: "slack-dark",
    });
    // 直接親の <pre> タグに HTML を挿入し、不要な <code> タグを取り除く
    $(elm).parent().replaceWith(html);
  });

  return $.html();
}
