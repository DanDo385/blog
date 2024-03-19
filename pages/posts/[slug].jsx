// pages/posts/[slug].jsx
import { useRouter } from 'next/router';
import PostDetail from '../../components/PostDetail';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';

// Placeholder comments data
const comments = [
  { id: 1, text: 'This is a great post!', author: 'User A' },
  // Add more comments
];

// Example post data. You would fetch this from your backend or markdown files.
const post = {
  title: 'Post Title',
  content: '<p>This is the post content.</p>',
  // Add other post properties
};

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <article>
      <PostDetail post={post} />
      <CommentForm slug={slug} />
      <CommentList comments={comments} />
    </article>
  );
}

