/**
 * GitHubのObsidianリポジトリとの繋ぎ込みのやつ
 * 「技術/<カテゴリ>/<タイトル>.md」をブログ記事として取得する
 */
import { cache } from 'react';
import { Blog } from '@/types/blog';
import { Category } from '@/types/category';
import { markdownToHtml } from './markdown';

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is required');
}

/** 記事を取得するリポジトリ */
const REPO = 'YoshimasaAsada/obsidian';
/** 記事を取得するブランチ */
const BRANCH = 'main';
/** 記事が入っているルートフォルダ */
const ROOT_DIR = '技術';
/** 全記事共通のアイキャッチ画像 */
const DEFAULT_EYECATCH_URL = '/images/default-eyecatch.png';

const API_BASE = `https://api.github.com/repos/${REPO}`;

/**
 * GitHub APIを叩く共通関数
 * @param url APIのURL
 * @param accept Acceptヘッダー（rawを指定するとファイルの中身がそのまま返る）
 * @returns
 */
const githubFetch = async (
  url: string,
  accept = 'application/vnd.github+json'
) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: accept,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'force-cache',
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${url}`);
  }
  return res;
};

type MarkdownFile = {
  /** リポジトリ内のファイルパス */
  path: string;
  /** カテゴリ（フォルダ名） */
  category: string;
  /** タイトル（拡張子を除いたファイル名） */
  title: string;
};

/**
 * 「技術/」以下のMarkdownファイル一覧を取得
 * @returns
 */
const listMarkdownFiles = async (): Promise<MarkdownFile[]> => {
  const res = await githubFetch(
    `${API_BASE}/git/trees/${BRANCH}?recursive=1`
  );
  const data = await res.json();
  return (data.tree as { path: string; type: string }[])
    .filter(
      (item) =>
        item.type === 'blob' &&
        item.path.startsWith(`${ROOT_DIR}/`) &&
        item.path.endsWith('.md') &&
        item.path.split('/').length === 3
    )
    .map((item) => {
      const [, category, filename] = item.path.split('/');
      return {
        path: item.path,
        category,
        title: filename.replace(/\.md$/, ''),
      };
    });
};

/**
 * ファイルの中身（Markdown）を取得
 * @param path リポジトリ内のファイルパス
 * @returns
 */
const fetchMarkdown = async (path: string): Promise<string> => {
  const res = await githubFetch(
    `${API_BASE}/contents/${encodeURI(path)}?ref=${BRANCH}`,
    'application/vnd.github.raw+json'
  );
  return res.text();
};

/**
 * ファイルのコミット履歴から投稿日・更新日を取得
 * 投稿日=最初のコミット日時、更新日=最後のコミット日時
 * @param path リポジトリ内のファイルパス
 * @returns
 */
const fetchDates = async (
  path: string
): Promise<{ publishedAt: string; updatedAt: string }> => {
  const res = await githubFetch(
    `${API_BASE}/commits?path=${encodeURIComponent(path)}&sha=${BRANCH}&per_page=100`
  );
  const commits = await res.json();
  const dates = (commits as { commit: { committer: { date: string } } }[]).map(
    (c) => c.commit.committer.date
  );
  // コミットは新しい順で返ってくる
  const fallback = new Date().toISOString();
  return {
    publishedAt: dates[dates.length - 1] ?? fallback,
    updatedAt: dates[0] ?? fallback,
  };
};

/**
 * 全てのブログを取得（投稿日の新しい順）
 * @returns
 */
export const getAllBlogs = cache(async (): Promise<Blog[]> => {
  const files = await listMarkdownFiles();
  const articleTitles = new Set(files.map((file) => file.title));

  const blogs = await Promise.all(
    files.map(async (file): Promise<Blog> => {
      const [markdown, dates] = await Promise.all([
        fetchMarkdown(file.path),
        fetchDates(file.path),
      ]);
      return {
        id: file.title,
        title: file.title,
        content: markdownToHtml(markdown, articleTitles),
        category: [{ id: file.category, name: file.category }],
        eyecatch: { url: DEFAULT_EYECATCH_URL },
        publishedAt: dates.publishedAt,
        updatedAt: dates.updatedAt,
      };
    })
  );

  return blogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
});

/**
 * ブログIDから該当するブログを取得
 * @param params ブログのID（URLエンコードされたままでも可）
 * @returns
 */
export const getBlogById = async (params: { id: string }) => {
  const blogs = await getAllBlogs();
  let id = params.id;
  try {
    id = decodeURIComponent(params.id);
  } catch {
    // 不正なエンコードの場合はそのまま検索する
  }
  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    throw new Error(`Blog not found: ${id}`);
  }
  return blog;
};

/**
 * 全てのカテゴリーを取得
 * @returns
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const blogs = await getAllBlogs();
  const names = new Set(blogs.flatMap((blog) => blog.category.map((c) => c.name)));
  return Array.from(names)
    .sort()
    .map((name) => ({ id: name, name }));
};
