const TOKEN = "9caa4699cb303422c9c1369fcb39df2abfef737aa5215f4684e592d9a0464ab037f2d2a7925dc8533506c904a2c7085d4354281a5864f19a0e1ada6c4e620cc7adbd157e8b938ec6a154e8d39ee160d6820a48ea38736c808fa1a4535a3acfc5695f578979285067a13fc2f84faff233ac6cee7543b53192acd5782f8eaecde8"
const URL = "http://strapi:1337";

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
