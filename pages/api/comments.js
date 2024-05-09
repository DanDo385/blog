// pages/api/comments.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName');
  const commentsCollection = db.collection('comments');

  try {
    if (req.method === 'POST') {
      const { slug, name, comment } = req.body;
      if (!slug || !name.trim() || !comment.trim()) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const response = await commentsCollection.insertOne({
        slug,
        name,
        comment,
        createdAt: new Date()
      });
      const newComment = response.ops[0];
      res.status(201).json(newComment);
    } else if (req.method === 'GET') {
      const { slug } = req.query;
      if (!slug) {
        return res.status(400).json({ message: 'Slug is required' });
      }
      const comments = await commentsCollection.find({ slug }).sort({ createdAt: -1 }).toArray();
      res.status(200).json(comments);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database operation failed', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
