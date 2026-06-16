import PostList from '@/app/components/PostList'
import { fetchPosts } from '@/app/lib/api'

export default async function Home() {
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}
