/**
 * カテゴリーのデータ型
 * Obsidianリポジトリの「技術/」直下のフォルダ名がそのままカテゴリーになる
 */
export type Category = {
  /** カテゴリーID（フォルダ名） */
  id: string;
  /** カテゴリー名 */
  name: string;
};
