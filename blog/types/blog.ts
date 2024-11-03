import { Category } from './category';

/**
 * ブログのデータ型
 */
export type Blog = {
  /** ブログのID */
  id: string;
  /** ブログのタイトル */
  title: string;
  /** ブログのコンテンツHTML */
  content: string;
  /** ブログのアイキャッチ画像 */
  eyecatch: {
    url: string;
  };
  /** ブログの持ってるカテゴリー */
  category: Category[];
  /** 投稿日 */
  publishedAt: string;
  /** 更新日 */
  updatedAt: string;
};

/**
 * ブログがcontentsオブジェクトで帰ってくる時のデータ型
 */
export type BlogsInContents = {
  /** ブログがcontenysオブジェクトで返ってくる時用 */
  contents: Blog[];
};
