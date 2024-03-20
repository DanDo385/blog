// components/CommentList.js
export default function CommentList({ comments }) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="list-disc ml-4">
          {comments.map((comment, index) => (
            <li key={index} className="mb-4">
              <p className="text-gray-600">Comment:{comment.comment}</p>
              <p className="text-sm text-gray-400">By: {comment.name}</p> {/* Ensure that name is included */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
