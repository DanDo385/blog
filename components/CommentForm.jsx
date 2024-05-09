//components.CommentForm.jsx
import { useState } from 'react';

export default function CommentForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      alert('Please enter your name and comment.');
      return;
    }

    await onSubmit({ name, comment });
    setName('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-green-400">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 focus:ring-green-400 focus:border-green-400 block w-full shadow-sm sm:text-sm border-green-400 rounded-md text-slate-900"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-green-400">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 focus:ring-green-400 focus:border-green-400 block w-full shadow-sm sm:text-sm border-green-400 rounded-md text-slate-900"
        />
      </div>
      <button
        type="submit"
        className="bg-green-400 text-slate-900 rounded-lg p-2"
        style={{ borderRadius: '.75rem' }}
      >
        Submit
      </button>
    </form>
  );
}
