import Category from './category'

export interface Post {
  id: number;
  Title: string;
  Published_Date: string;
  Slug: string;
  Content: string
  Category: Category
}
