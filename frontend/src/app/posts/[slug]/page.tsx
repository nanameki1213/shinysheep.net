import { Heading, Flex, Text } from "@radix-ui/themes";
import Post from "@/app/types/posts";
import ReactMarkdown from 'react-markdown'

const TOKEN = process.env.TOKEN
const URL = process.env.API_URL 

async function getPost(slug: string) {
  try {
    const res = await fetch(URL + `/api/posts?filters[Slug][$eq]=${slug}&populate=*`, {
      headers: {
          'Authorization': 'Bearer ' + TOKEN
        },
    });
    const data = await res.json();
    if (data.data == null) {
      console.error('APIのエラーが発生しました：', data.error.detail)
    } else {
      const post: Post = data.data[0]
      return post
    }
  } catch(err) {
    console.error('エラーが発生しました：', err)
  }
}

export default async function postPage({ params }: { params: { slug: string } }) {
  const pars = await params
  const post = await getPost(pars.slug);
  if (post == undefined) {
    console.error('記事一覧の取得に失敗しました。')
    return (
      <Flex direction="column" gap="4">
        <Heading size="6">記事一覧</Heading>
        <Text color="red">記事の取得に失敗しました。</Text>
      </Flex>
    );
  }
  return (
    <div>
      <h1>{post.Title}</h1>
      <Flex gap="2">
        <Text as="p" size="2" weight="light">{post.Published_Date}</Text>
        <Text as="p" size="2">カテゴリ：{post.category.Name}</Text>
      </Flex>
      <ReactMarkdown>{post.Content}</ReactMarkdown>
    </div>
  );
}
