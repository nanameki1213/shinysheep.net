import Category from './category'

export default interface Post {
  id: number;
  Title: string;
  Published_Date: string;
  Slug: string;
  Content: string
  category: Category
}
