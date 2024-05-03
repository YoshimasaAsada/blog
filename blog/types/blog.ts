import { Category } from "./category";

export interface Blog {
  id: string;
  title: string;
  /** blogのコンテンツHTML */
  content: string;
  eyecatch: {
    url: string;
  };
  category: Category[];
  publishedAt: string;
  updatedAt: string;
}
