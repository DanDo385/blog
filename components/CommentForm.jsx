// components/CommentForm.jsx
import { useState } from 'react';

function CommentForm({ slug, onCommentSubmitted }) {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, comment }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.json();
        setStatus(result.message); // Or any success message you prefer
        setComment(''); // Clear the textarea after successful submission
        onCommentSubmitted(); // Refresh the comments list
      }
    } catch (error) {
      console.error("Failed to submit comment", error);
      setStatus('Failed to submit comment. Please try again.'); // Error message for the user
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
      {status && <p>{status}</p>} {/* Display status message to the user */}
    </div>
  );
}

export default CommentForm;
