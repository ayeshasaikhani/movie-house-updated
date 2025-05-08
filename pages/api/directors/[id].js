import dbConnect from '../../../lib/dbConnect';
import { Director, Movie } from '../../../models';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // First get the director
        const director = await Director.findById(id);
        
        if (!director) {
          return res.status(404).json({ error: 'Director not found' });
        }

        // Then get all movies by this director
        const movies = await Movie.find({ director: id })
          .populate('genre')
          .populate('director');

        // Combine the data
        const directorWithMovies = {
          ...director.toObject(),
          movies: movies
        };
        
        res.status(200).json(directorWithMovies);
      } catch (error) {
        console.error('Error fetching director:', error);
        res.status(500).json({ error: 'Failed to fetch director' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 