import { Category } from "./category";

export interface Blog {
  id: string;
  title: string;
  content: any;
  eyecatch: any;
  category: Category[];
  publishedAt: any;
}
