// components/CommentList.jsx
function CommentList({ comments }) {
  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.text}</p>
          <p>By: {comment.author}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
