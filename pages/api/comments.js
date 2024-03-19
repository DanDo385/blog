// pages/api/comments.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle POST request
      const { comment } = req.body;
      console.log('Received comment:', comment);
      res.status(200).json({ status: 'success', comment });
    } else {
      // Method not allowed
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  }
  