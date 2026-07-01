import { notFound } from 'next/navigation'
import PostArticle from '@/app/components/PostArticle'
import { fetchPosts, fetchPostById } from '@/app/lib/api'

export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map((post) => ({ slug: post.id }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPostById(slug)

  if (!post) {
    notFound()
  }

  return <PostArticle post={post} />
}
