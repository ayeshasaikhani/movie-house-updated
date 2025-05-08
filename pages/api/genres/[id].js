import dbConnect from '../../../lib/dbConnect';
import { Genre } from '../../../models';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const genre = await Genre.findById(id);
        
        if (!genre) {
          return res.status(404).json({ error: 'Genre not found' });
        }
        
        res.status(200).json(genre);
      } catch (error) {
        console.error('Error fetching genre:', error);
        res.status(500).json({ error: 'Failed to fetch genre' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 