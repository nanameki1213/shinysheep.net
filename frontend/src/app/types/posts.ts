import Category from './category'
import MicroCMSImage from './media'

// microCMS の繰り返しフィールド `content` の各ブロック。
// リッチエディタ／HTML の2種類のカスタムフィールドを混在させられる。
export type ContentBlock = { fieldId: 'richEditor'; richEditor: string } | { fieldId: 'html'; html: string }

export default interface Post {
  id: string
  title: string
  content: ContentBlock[]
  eyecatch?: MicroCMSImage
  category?: Category
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  revisedAt?: string
}

export interface PostsResponse {
  contents: Post[]
  totalCount: number
  offset: number
  limit: number
}
