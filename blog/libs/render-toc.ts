import * as cheerio from "cheerio";

// 見出しのテキストとID、そしてその階層レベルを含むオブジェクトの配列を返す
export const renderToc = (body: string) => {
  const $ = cheerio.load(body);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((heading) => {
    // heading.name でタグ名（h1, h2, h3）を取得し、その数値部分を階層レベルとして使用
    const level = parseInt(heading.tagName[1], 10);
    const text = $(heading).text();
    const id = $(heading).attr('id') || '';

    return { text, id, level };
  });

  return toc;
};
