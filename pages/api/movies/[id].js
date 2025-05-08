import dbConnect from '../../../lib/dbConnect';
import { Movie } from '../../../models';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const movie = await Movie.findById(id)
          .populate('genre')
          .populate('director');
          
        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 