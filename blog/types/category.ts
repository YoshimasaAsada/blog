import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

/**
 * カテゴリーのデータ型
 */
export type Category = CategoryInContents & MicroCMSContentId & MicroCMSDate

/**
 * カテゴリーがcontentsオブジェクトで返ってくる時のデータ型
 */
export type CategoryInContents = {
  /** カテゴリー名 */
  name: string;
};
