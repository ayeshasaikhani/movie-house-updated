import dbConnect from '../../../lib/dbConnect';
import { Movie } from '../../../models';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const movies = await Movie.find({})
          .populate('genre')
          .populate('director');
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 