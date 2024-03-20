// components/CommentList.js
export default function CommentList({ comments }) {
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC', // Adjust time zone if necessary
    });
    return formatter.format(date);
  };

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="list-disc ml-4">
          {comments.map((comment, index) => (
            <li key={index} className="mb-4">
              <p className="text-green-400">{comment.comment}</p>
              <p className="text-sm text-green-400">By: {comment.name}</p>
              <p className="text-xs text-green-400">{formatDate(comment.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
