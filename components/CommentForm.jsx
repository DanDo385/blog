// components/CommentForm.jsx
import { useState } from 'react';

function CommentForm({ slug, onCommentSubmitted }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, comment }),
    });
    setComment('');
    onCommentSubmitted(); // Trigger comment refresh in parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment..." required></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;
