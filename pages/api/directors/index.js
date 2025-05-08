import dbConnect from '../../../lib/dbConnect';
import { Director, Movie } from '../../../models';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // Get all directors
        const directors = await Director.find({});
        
        // Get movie counts for each director
        const directorsWithMovieCounts = await Promise.all(
          directors.map(async (director) => {
            const movieCount = await Movie.countDocuments({ director: director._id });
            return {
              ...director.toObject(),
              movieCount
            };
          })
        );

        res.status(200).json(directorsWithMovieCounts);
      } catch (error) {
        console.error('Error fetching directors:', error);
        res.status(500).json({ error: 'Failed to fetch directors' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
} 