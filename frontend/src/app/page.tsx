import Link from "next/link";
import Post from "@/app/types/posts";
import { Heading, Flex, Card, Text, Separator } from '@radix-ui/themes'

// Read-Onlyのtoken
const TOKEN = process.env.TOKEN
const URL = process.env.API_URL

async function getPosts() {
  try {
    const res = await fetch(URL + '/api/posts?populate=*', {
      cache: 'no-store',
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      },
    });
    const data = await res.json();
    if (data.data == null) {
      console.error('APIのエラーが発生しました：', data.error.detail)
    } else {
      const posts: Post[] = data.data;
      return posts;
    }
  } catch(err) {
    console.error('エラーが発生しました：', err);
  }
}

export default async function Home() {
  const posts = await getPosts();
  if (posts == undefined) {
    console.error('記事一覧の取得に失敗しました。')
    return (
      <Flex direction="column" gap="4">
        <Heading size="6">記事一覧</Heading>
        <Text color="red">記事の取得に失敗しました。</Text>
      </Flex>
    );
  }
  return (
    <Flex direction="column" gap="4" p="4">
      <Heading size="6">最新の記事</Heading>
      <Separator size="4" />
      <Flex direction="column" gap="3">
        {posts.map((post: Post) => (
          <Link href={`/posts/${post.Slug}`} passHref key={post.id}>
            <Card asChild>
              <Flex direction="column" gap="2">
                <Text as="p" size="5" weight="bold">{post.Title}</Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
