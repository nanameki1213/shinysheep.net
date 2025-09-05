const TOKEN = process.env.TOKEN
const URL = process.env.API_URL 

async function getPost(slug: string) {
  const res = await fetch(URL + `/api/posts?filters[Slug][$eq]=${slug}`, {
    headers: {
        'Authorization': 'Bearer ' + TOKEN
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
