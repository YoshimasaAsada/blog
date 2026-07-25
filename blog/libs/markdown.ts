import { Marked, Renderer } from 'marked';

/**
 * Obsidianのwikiリンク（[[記事名]] / [[記事名|表示名]]）を変換する。
 * リンク先がブログ記事として存在する場合は内部リンクに、
 * 存在しない場合はプレーンテキストにする。
 * @param markdown Markdown本文
 * @param articleTitles ブログ記事として存在するタイトル（=ファイル名）の集合
 * @returns
 */
const convertWikiLinks = (markdown: string, articleTitles: Set<string>) => {
  return markdown.replace(
    /!?\[\[([^\][|]+)(?:\|([^\][]+))?\]\]/g,
    (_, target: string, alias?: string) => {
      const title = target.trim();
      const label = (alias ?? title).trim();
      if (articleTitles.has(title)) {
        return `[${label}](/blog/${encodeURIComponent(title)})`;
      }
      return label;
    }
  );
};

/**
 * 先頭のfrontmatter（--- で囲まれたブロック）があれば取り除く
 * @param markdown Markdown本文
 * @returns
 */
const stripFrontmatter = (markdown: string) => {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
};

/**
 * 日本語の約物に隣接した「**太字**」をCommonMarkが強調として
 * 認識できない問題への対応。コードブロック・インラインコードは
 * 触らずに、それ以外の部分の**...**を<strong>タグへ直接変換する。
 * @param markdown Markdown本文
 * @returns
 */
const convertCjkBold = (markdown: string) => {
  // コードフェンスとインラインコードを境に分割し、コード以外だけ変換する
  const parts = markdown.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/);
  return parts
    .map((part, index) => {
      if (index % 2 === 1) return part;
      return part.replace(
        /\*\*([^*\n]+)\*\*/g,
        '<strong>$1</strong>'
      );
    })
    .join('');
};

/**
 * MarkdownをブログコンテンツのHTMLに変換する。
 * 見出しには目次（TOC）用のidを付与する。
 * @param markdown Markdown本文
 * @param articleTitles wikiリンク解決用の全記事タイトル集合
 * @returns
 */
export const markdownToHtml = (
  markdown: string,
  articleTitles: Set<string>
) => {
  let headingIndex = 0;
  const renderer = new Renderer();
  renderer.heading = (text, level) => {
    return `<h${level} id="heading-${headingIndex++}">${text}</h${level}>\n`;
  };

  const marked = new Marked({ gfm: true, breaks: true, renderer });

  const source = convertCjkBold(
    convertWikiLinks(stripFrontmatter(markdown), articleTitles)
  );
  return marked.parse(source, { async: false }) as string;
};
