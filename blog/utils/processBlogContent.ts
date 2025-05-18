import { getHighlighter } from 'shiki';
import * as cheerio from 'cheerio';

/**
 * ブログで使っているリンクのOGPデータ取得用関数
 * @param url
 * @returns
 */
async function fetchOGPData(url: string) {
  const response = await fetch(url);
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
    langs: [
      'tsx',
      'shell',
      'typescript',
      'dockerfile',
      'yml',
      'json',
      'ruby',
      'mermaid',
    ],
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

  // コードブロックのシンタックスハイライトを行う
  $('pre code').each((_, elm) => {
    let language = $(elm).attr('class')?.split('language-')[1] || '';
    const codeText = $(elm).text();
    const html = highlighter.codeToHtml(codeText, {
      lang: language,
      theme: 'slack-dark',
    });
    $(elm).parent().replaceWith(html);
  });

  // リンクカードを適用する
  const linkPromises = $('a').map(async (_, elm) => {
    const url = $(elm).attr('href');
    if (!url) return;
    const ogpData = await fetchOGPData(url);
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
