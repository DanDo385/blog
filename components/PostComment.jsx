// components/PostComment.jsx
function PostComment({ slug, onCommentSubmitted }) {
  const { user } = useUser();
  const [comment, setComment] = useState('');

  const submitComment = async () => {
    if (!user) {
      window.location.href = '/api/auth/login';
      return;
    }

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, text: comment, author: user.name || user.email }),
    });

    setComment('');
    if (response.ok) {
      onCommentSubmitted(); // Invoke the callback after successful submission
    }
    // Consider handling the error case here as well
  };

  return (
    <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
      />
      <button onClick={submitComment}>
        {user ? 'Send' : 'Log in to Comment'}
      </button>
    </div>
  );
}

export default PostComment;
