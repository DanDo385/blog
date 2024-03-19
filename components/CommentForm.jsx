// components/CommentForm.jsx
import { useState } from 'react';

function CommentForm({ slug }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST request to /api/comments
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, comment }),
    });

    if (response.ok) {
      setComment(''); // Reset comment field on successful submission
      // Optionally: trigger a refresh or update of comments list
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        required
      ></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;
