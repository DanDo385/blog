import Link from 'next/link';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  let formattedDate = date.toLocaleDateString('en-US', options);

  // Add the suffix (st, nd, rd, th)
  const day = date.getDate();
  let suffix = 'th';
  if (day % 10 === 1 && day !== 11) suffix = 'st';
  else if (day % 10 === 2 && day !== 12) suffix = 'nd';
  else if (day % 10 === 3 && day !== 13) suffix = 'rd';

  return formattedDate.replace(new RegExp(' ' + day), ` ${day}${suffix}`);
}

function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} style={{ marginBottom: '1em' }}>
          <Link href={`/posts/${post.slug}`} passHref>
            <span className="cursor-pointer">{post.title}</span>
          </Link>
          <br />
          <span className="text-sm">{formatDate(post.date)}</span>
        </li>
      ))}
    </ul>
  );
}

export default PostList;

