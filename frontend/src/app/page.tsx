import Link from "next/link";

async function getArticles() {
  const res = await fetch('http://localhost:1337/api/articles');
  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <div className="text-4xl">記事一覧</div>
      <ul>
        {articles.map(article => (
          <li key={articles.id}>
            <Link href={`/articles/${article.attributes.slug}`}>{article.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
