// pages/posts/index.js
import { MongoClient } from 'mongodb';
import PostList from '@components/PostList';

export async function getStaticProps() {
  // Connect to the database
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  // Fetch the posts from the database
  const posts = await db.collection('posts').find({}).toArray();

  // Close the database connection
  client.close();

  return {
    props: {
      // Convert _id (ObjectId) to string to avoid serialization error
      posts: posts.map((post) => ({
        ...post,
        _id: post._id.toString(),
      })),
    },
    revalidate: 10, // In seconds
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
