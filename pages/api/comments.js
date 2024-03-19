// pages/api/comments.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName');
  const commentsCollection = db.collection('comments');

  if (req.method === 'POST') {
    const { slug, comment } = req.body;
    try {
      await commentsCollection.insertOne({ slug, comment, createdAt: new Date() });
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).json({ error: 'Error saving comment' });
    }
  } else if (req.method === 'GET') {
    const { slug } = req.query;
    try {
      const comments = await commentsCollection.find({ slug }).toArray();
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Error fetching comments' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
