// components/PostDetail.jsx
export default function PostDetail({ post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <h4>{post.date}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
