// app/articles/[slug]/page.tsx
async function getPost(slug: string) {
  const res = await fetch(`http://localhost:1337/api/posts?filters[Slug][$eq]=${slug}`, {
    headers: {
        'Authorization': 'Bearer f7ea886366caf77ef0acfc83d403024543f4726e8c8db2daf31138116e0c3df7142b9c0bf6882f089fd9c50c7837634d01ee55f82590329c6e44e81aef419530fc5ffafa9dd50e1f3b7aee85b0159b89e8784edadfc69a9f96dc80521e625f42a626470affa360aeabbae68871b0cc2ce45170020373dbe8e978739df6efc2a2'
      },
  });
  const data = await res.json();
  console.log(data);
  return data.data;
}

export default async function postPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  console.log(post);
  return (
    <div>
      <h1>{post[0].Title}</h1>
      <p>{post[0].Content}</p>
    </div>
  );
}
