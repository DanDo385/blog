// components/PostDetail.jsx
function PostDetail({ post }) {
    return (
      <article>
        <h3>{post.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    );
  }
  
  export default PostDetail;
  