import { Category } from './category';

/**
 * ブログのデータ型
 * Obsidianリポジトリの「技術/<カテゴリ>/<タイトル>.md」から生成される
 */
export type Blog = {
  /** ブログのID（ファイル名から生成したスラッグ） */
  id: string;
  /** ブログのタイトル（ファイル名） */
  title: string;
  /** ブログのコンテンツHTML（Markdownから変換済み） */
  content: string;
  /** ブログのカテゴリ */
  category: Category[];
  /** ブログのアイキャッチ画像 */
  eyecatch: {
    url: string;
  };
  /** 投稿日（最初のコミット日時） */
  publishedAt: string;
  /** 更新日（最後のコミット日時） */
  updatedAt: string;
};
