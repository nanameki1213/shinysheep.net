import Link from "next/link";
import { Post } from "@/app/types/posts";
import { Heading, Flex, Card, Text, Separator } from '@radix-ui/themes'

// Read-Onlyのtoken
const TOKEN = "9caa4699cb303422c9c1369fcb39df2abfef737aa5215f4684e592d9a0464ab037f2d2a7925dc8533506c904a2c7085d4354281a5864f19a0e1ada6c4e620cc7adbd157e8b938ec6a154e8d39ee160d6820a48ea38736c808fa1a4535a3acfc5695f578979285067a13fc2f84faff233ac6cee7543b53192acd5782f8eaecde8"
const URL = "http://100.86.44.46:1337";

async function getPosts() {
  try {
    const res = await fetch(URL + '/api/posts', {
      cache: 'no-store',
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      },
    });
    const data = await res.json();
    console.log(data)
    const posts: Post[] = data.data;
    console.log(posts)
    return posts;
  } catch(err) {
    console.error('エラーが発生しました：', err);
  }
}

export default async function Home() {
  console.log('Hello World!')
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
