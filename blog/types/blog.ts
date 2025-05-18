import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';
import { Category } from './category';

/**
 * ブログのデータ型
 */
export type Blog = BlogsInContents & MicroCMSContentId & MicroCMSDate;

/**
 * ブログがcontentsオブジェクトで帰ってくる時のデータ型
 */
export type BlogsInContents = {
  /** ブログのコンテンツ */
  contents: string;
  /** ブログのカテゴリ */
  category: Category[];
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
  /** 投稿日 */
  publishedAt: string;
  /** 更新日 */
  updatedAt: string;
};
