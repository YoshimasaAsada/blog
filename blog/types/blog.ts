import { Category } from "./category";

export interface Blog {
  id: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
  };
  category: Category[];
  publishedAt: string;
}
