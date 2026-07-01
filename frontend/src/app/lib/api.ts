import Post, { PostsResponse } from '@/app/types/posts'

const API_KEY = process.env.MICROCMS_API_KEY
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`

const headers = {
  'X-MICROCMS-API-KEY': API_KEY ?? '',
}

// ビルド時、Next.js は複数ワーカー並列で静的生成を行う。各ワーカーの fetch が
// microCMS の API CDN キャッシュの新旧をまたぐと、記事一覧や本文が不整合なまま
// HTML に焼き付いてしまう。ビルドごとに一意なクエリを付けて CDN を回避し、
// 全ワーカーが一貫した最新データを取得できるようにする。
const CACHE_BUSTER = Date.now().toString()

function withCacheBuster(url: string): string {
  return `${url}${url.includes('?') ? '&' : '?'}_=${CACHE_BUSTER}`
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(withCacheBuster(`${BASE_URL}/blogs`), { headers })

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data: PostsResponse = await res.json()
  return data.contents
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const res = await fetch(withCacheBuster(`${BASE_URL}/blogs/${encodeURIComponent(id)}`), { headers })

  if (res.status === 404) return null

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`)
  }

  return res.json()
}
