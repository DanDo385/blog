// components/PostList.jsx
import Link from 'next/link';

function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <span>{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
