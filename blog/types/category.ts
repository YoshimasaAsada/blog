export type Category = {
  id: string;
  name: string;
};

export interface CategoryInContents {
  contents: Category[];
}
