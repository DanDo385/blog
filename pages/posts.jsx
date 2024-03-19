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
    <div className="bg-slate-900 text-green-400 min-h-screen">
      <h1 className="text-4xl font-semibold p-5">Blog Posts</h1>
      <div className="p-5">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
