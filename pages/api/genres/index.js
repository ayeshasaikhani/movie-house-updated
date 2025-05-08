import dbConnect from '../../../lib/dbConnect';
import { Genre } from '../../../models';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const genres = await Genre.find({});
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch genres' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 