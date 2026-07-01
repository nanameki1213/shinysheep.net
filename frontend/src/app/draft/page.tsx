'use client'

import { Callout, Flex, Spinner, Text, Badge, Box } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import PostArticle from '@/app/components/PostArticle'
import Post from '@/app/types/posts'

function DraftContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const draftKey = searchParams.get('draftKey')

  const [post, setPost] = useState<Post | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || !draftKey) {
      setError('プレビューに必要なパラメータ（id / draftKey）が指定されていません。')
      setLoading(false)
      return
    }

    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams({ id: id!, draftKey: draftKey! })
        const res = await fetch(`/api/preview?${params.toString()}`, { signal: controller.signal })

        if (!res.ok) {
          throw new Error(`プレビューの取得に失敗しました (${res.status})`)
        }

        const data: Post = await res.json()
        setPost(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'プレビューの取得に失敗しました。')
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [id, draftKey])

  if (loading) {
    return (
      <Flex align="center" justify="center" gap="3" py="9">
        <Spinner size="3" />
        <Text color="gray">プレビューを読み込んでいます…</Text>
      </Flex>
    )
  }

  if (error) {
    return (
      <Callout.Root color="red" my="6">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    )
  }

  if (!post) {
    return (
      <Callout.Root color="gray" my="6">
        <Callout.Text>プレビュー対象のコンテンツが見つかりませんでした。</Callout.Text>
      </Callout.Root>
    )
  }

  return (
    <Box>
      <Flex mb="4">
        <Badge color="orange" variant="solid" size="2">
          下書きプレビュー
        </Badge>
      </Flex>
      <PostArticle post={post} />
    </Box>
  )
}

export default function DraftPage() {
  return (
    <Suspense
      fallback={
        <Flex align="center" justify="center" gap="3" py="9">
          <Spinner size="3" />
          <Text color="gray">プレビューを読み込んでいます…</Text>
        </Flex>
      }
    >
      <DraftContent />
    </Suspense>
  )
}
