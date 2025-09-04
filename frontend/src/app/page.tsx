import Link from "next/link";
import { Post } from "@/app/types/posts";

// Read-Onlyのtoken
const TOKEN = "f7ea886366caf77ef0acfc83d403024543f4726e8c8db2daf31138116e0c3df7142b9c0bf6882f089fd9c50c7837634d01ee55f82590329c6e44e81aef419530fc5ffafa9dd50e1f3b7aee85b0159b89e8784edadfc69a9f96dc80521e625f42a626470affa360aeabbae68871b0cc2ce45170020373dbe8e978739df6efc2a2"
const URL = "http://shinysheep.net:1337";

async function getPosts() {
  try {
    const res = await fetch(URL + '/api/posts', {
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      },
    });
    const data = await res.json();
    const posts: Post[] = data.data;
    return posts;
  } catch(err) {
    console.error('エラーが発生しました：', err);
  }
}

export default async function Home() {
  const posts = await getPosts();
  if (posts == undefined) {
    console.error('記事一覧の取得に失敗しました。')
    return;
  }
  return (
    <div>
      <h1>記事一覧</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.Slug}`}>{post.Title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
