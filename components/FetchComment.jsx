// components/FetchComment.jsx
function FetchComment({ comments }) {
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
  
  export default FetchComment;
  