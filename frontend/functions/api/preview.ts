// Cloudflare Pages Function: microCMS の下書きプレビュー用プロキシ。
// API キーをクライアントに露出させないため、エッジ側で microCMS を叩いて結果を返す。

interface Env {
  MICROCMS_API_KEY: string
  MICROCMS_SERVICE_DOMAIN: string
}

interface EventContext<E> {
  request: Request
  env: E
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // プレビューは常に最新の下書きを取得する
      'Cache-Control': 'no-store',
    },
  })
}

export async function onRequestGet(context: EventContext<Env>): Promise<Response> {
  const { request, env } = context
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const draftKey = url.searchParams.get('draftKey')

  if (!id || !draftKey) {
    return json({ message: 'id と draftKey は必須です。' }, 400)
  }

  if (!env.MICROCMS_API_KEY || !env.MICROCMS_SERVICE_DOMAIN) {
    return json({ message: 'サーバー側の microCMS 設定が不足しています。' }, 500)
  }

  const endpoint = new URL(`https://${env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${encodeURIComponent(id)}`)
  endpoint.searchParams.set('draftKey', draftKey)

  const res = await fetch(endpoint.toString(), {
    headers: { 'X-MICROCMS-API-KEY': env.MICROCMS_API_KEY },
  })

  if (res.status === 404) {
    return json({ message: '指定されたコンテンツが見つかりませんでした。' }, 404)
  }

  if (!res.ok) {
    return json({ message: `microCMS からの取得に失敗しました (${res.status})。` }, res.status)
  }

  const data = await res.json()
  return json(data, 200)
}
