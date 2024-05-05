/**
 * カテゴリーのデータ型
 */
export type Category = {
  /** カテゴリーのID */
  id: string;
  /** カテゴリーの名前 */
  name: string;
};

/**
 * カテゴリーがcontentsオブジェクトで返ってくる時のデータ型
 */
export type CategoryInContents = {
  /** カテゴリーがcontentsオブジェクトで返ってくる時用 */
  contents: Category[];
};
