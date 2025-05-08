const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const dbConnect = require('../lib/dbConnect');
const { Movie, Genre, Director } = require('../models');
const fs = require('fs');

async function seed() {
  try {
    await dbConnect();
    
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'data', 'movies.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Clear existing data
    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await Director.deleteMany({});

    // Create genres
    const genreMap = {};
    for (const genre of data.genres) {
      const newGenre = await Genre.create({
        name: genre.name,
        description: `${genre.name} movies`
      });
      genreMap[genre.id] = newGenre._id;
    }

    // Create directors
    const directorMap = {};
    for (const director of data.directors) {
      const newDirector = await Director.create({
        name: director.name,
        bio: director.biography,
        birthYear: 1970, // Default value since not in JSON
        nationality: 'Unknown' // Default value since not in JSON
      });
      directorMap[director.id] = newDirector._id;
    }

    // Create movies
    for (const movie of data.movies) {
      await Movie.create({
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genre: genreMap[movie.genreId],
        director: directorMap[movie.directorId],
        rating: movie.rating,
        posterUrl: `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.title)}` // Placeholder poster
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 