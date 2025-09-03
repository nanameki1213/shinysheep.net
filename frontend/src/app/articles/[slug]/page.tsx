// app/articles/[slug]/page.tsx
async function getArticle(slug: string) {
  const res = await fetch(`http://localhost:1337/api/articles?filters[slug][$eq]=${slug}`);
  const data = await res.json();
  return data.data[0];
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  return (
    <div>
      <div className="text-4xl">{article.attributes.title}</div>
      <p>{article.attributes.content}</p>
    </div>
  );
}
