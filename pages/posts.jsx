// pages/posts/index.js
import PostList from '@components/PostList';
import getPosts from '@utils/getPosts';

export async function getStaticProps() {
  const allPostsData = getPosts();
  return {
    props: {
      posts: allPostsData,
    },
  };
}

export default function PostsPage({ posts }) {
  return (
    <div 
      className="bg-slate-900 text-green-400 min-h-screen"
      style={{
        backgroundImage: 'url(/blockchaindots.jpg)',
        backgroundSize: 'cover', // Cover the entire page
        backgroundPosition: 'center', // Center the background image
      }}
    >
      <h3 className="text-2xl font-semibold p-5 underline">Blog Posts</h3>
      <div className="p-5">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
