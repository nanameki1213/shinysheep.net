import { Flex, Heading, Separator } from '@radix-ui/themes'
import PostCard from './PostCard'
import Post from '@/app/types/posts'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <Flex direction="column" gap="4" p="4">
      <Heading size="6">最新の記事</Heading>
      <Separator size="4" />
      <Flex direction="column" gap="3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </Flex>
  )
}
