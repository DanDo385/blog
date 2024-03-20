// pages/api/comments.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName');
  const commentsCollection = db.collection('comments');

  if (req.method === 'POST') {
    const { slug, name, comment } = req.body;
    await commentsCollection.insertOne({
      slug,
      name,
      comment,
      createdAt: new Date()
    });
    res.status(201).json({ message: 'Comment added successfully' });
  } else if (req.method === 'GET') {
    const { slug } = req.query;
    const comments = await commentsCollection.find({ slug }).toArray();
    res.status(200).json(comments);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
