import { getHighlighter } from 'shiki';
import * as cheerio from 'cheerio';

/**
 * シンタックスハイライトで読み込む言語一覧
 * Obsidianの記事で使われている言語をカバーする
 */
const HIGHLIGHT_LANGS = [
  'tsx',
  'shell',
  'typescript',
  'javascript',
  'dockerfile',
  'yaml',
  'json',
  'ruby',
  'sql',
  'prisma',
  'http',
  'html',
] as const;

/**
 * ブログで使っているリンクのOGPデータ取得用関数
 * @param url
 * @returns
 */
async function fetchOGPData(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  const html = await response.text();
  const $ = cheerio.load(html);

  const getMetaTag = (name: string) => {
    return (
      $(`meta[name=${name}]`).attr('content') ||
      $(`meta[property="og:${name}"]`).attr('content') ||
      $(`meta[property="twitter:${name}"]`).attr('content')
    );
  };

  return {
    title: getMetaTag('title'),
    description: getMetaTag('description'),
    image: getMetaTag('image'),
  };
}

/**
 * ブログコンテンツを加工する
 * シンタックスハイライトとリンクカードの適用
 * @param content コンテンツのHTML丸ごと
 * @returns
 */
export async function processBlogContent(content: string) {
  const highlighter = await getHighlighter({
    themes: ['slack-dark'],
    langs: [...HIGHLIGHT_LANGS],
  });
  const $ = cheerio.load(content);

  // コードブロックのファイル名が入力されている場合の処理
  $('div[data-filename]').each((_, elm) => {
    $(elm).prepend(
      `<div class="code-bar"><div class="circle" data-color="red"></div><div class="circle" data-color="yellow"></div><div class="circle" data-color="green"></div><div class="file-name">${$(
        elm
      ).attr('data-filename')}</div><div>`
    );
  });

  // mermaidのコードブロックはシンタックスハイライトせず、
  // クライアント側で図としてレンダリングするためのクラスを付けて残す
  $('pre code').each((_, elm) => {
    const rawLanguage = $(elm).attr('class')?.split('language-')[1] || '';
    if (rawLanguage !== 'mermaid') return;
    const pre = $('<pre class="mermaid"></pre>');
    pre.text($(elm).text());
    $(elm).parent().replaceWith(pre);
  });

  // テーブルはスマホではみ出さないよう横スクロール可能なラッパーで包む
  $('table').wrap('<div class="table-wrapper"></div>');

  // コードブロックのシンタックスハイライトを行う
  const langAliases: Record<string, string> = {
    bash: 'shell',
    sh: 'shell',
    zsh: 'shell',
    ts: 'typescript',
    js: 'javascript',
    yml: 'yaml',
  };
  $('pre code').each((_, elm) => {
    const rawLanguage = $(elm).attr('class')?.split('language-')[1] || '';
    const language = langAliases[rawLanguage] || rawLanguage;
    const codeText = $(elm).text();
    let html: string;
    try {
      html = highlighter.codeToHtml(codeText, {
        lang: language,
        theme: 'slack-dark',
      });
    } catch {
      // 未対応の言語はプレーンテキストとして表示する
      html = highlighter.codeToHtml(codeText, {
        lang: 'text',
        theme: 'slack-dark',
      });
    }
    $(elm).parent().replaceWith(html);
  });

  // リンクカードを適用する
  // 対象は「段落内に単独で置かれた外部リンク」のみ。
  // 文中のインラインリンクや内部リンクはそのまま残す。
  const standaloneLinks = $('a').filter((_, elm) => {
    const url = $(elm).attr('href') || '';
    if (!/^https?:\/\//.test(url)) return false;
    const parent = $(elm).parent();
    return parent.is('p') && parent.text().trim() === $(elm).text().trim();
  });

  const linkPromises = standaloneLinks.map(async (_, elm) => {
    const url = $(elm).attr('href');
    if (!url) return;

    // OGPが取れないリンクは通常のリンクのまま残す
    let ogpData;
    try {
      ogpData = await fetchOGPData(url);
    } catch {
      return;
    }
    if (!ogpData.title) return;

    const optimizedImageUrl = `${ogpData.image}?w=270&h=150&fit=crop`;
    const optimizedImageUrlWebP = `${ogpData.image}?w=270&h=150&fit=crop&format=webp`;
    const optimizedImageUrlAVIF = `${ogpData.image}?w=270&h=150&fit=crop&format=avif`;

    const linkCardHtml = `
    <div class="link-card mt-3 mb-3">
      <a href="${url}" target="_blank" rel="noopener noreferrer">
        <div class="link-card-body">
          <div class="link-card-info">
            <div class="link-card-title">${ogpData.title}</div>
            <div class="link-card-url">${url}</div>
          </div>
          <img
            alt="link card image"
            data-src="${optimizedImageUrl}"
            class="link-card-thumbnail"
            loading="lazy"
            decoding="async"
            srcset="${optimizedImageUrlAVIF} 270w, ${optimizedImageUrlWebP} 270w, ${optimizedImageUrl} 270w"
            sizes="(max-width: 768px) 100vw, 270px"
          />
        </div>
      </a>
    </div>`;

    $(elm).replaceWith(linkCardHtml);
  });

  // 画像最適化処理
  $('img').each((_, elm) => {
    const src = $(elm).attr('src');
    if (!src) return;

    const webpSrc = `${src}?w=800&fit=crop&format=webp`;
    const avifSrc = `${src}?w=800&fit=crop&format=avif`;
    const defaultSrc = `${src}?w=800&fit=crop`;

    const srcSet = `
    ${avifSrc} 800w,
    ${webpSrc} 800w,
    ${defaultSrc} 800w
  `;
    const sizes = '(max-width: 768px) 100vw, 800px';

    $(elm).attr('src', defaultSrc);
    $(elm).attr('srcset', srcSet);
    $(elm).attr('sizes', sizes);
    $(elm).attr('loading', 'lazy');
    $(elm).attr('decoding', 'async');
  });

  await Promise.all(linkPromises.get());

  return $.html();
}
