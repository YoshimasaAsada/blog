import * as cheerio from "cheerio";

/**
 * ブログのTOC
 * @param body ブログコンテンツの中身のHTML
 * @returns
 */
export const renderToc = (body: string) => {
  const $ = cheerio.load(body);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((heading) => {
    const level = parseInt(heading.tagName[1], 10);
    const text = $(heading).text();
    const id = $(heading).attr("id") || "";

    return { text, id, level };
  });

  return toc;
};
