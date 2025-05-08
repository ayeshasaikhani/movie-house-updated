import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Genres.module.css';
import dbConnect from '../../lib/dbConnect';
import Genre from '../../models/genre';
import Movie from '../../models/movie';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres');
        if (!response.ok) throw new Error('Failed to fetch genres');
        const data = await response.json();
        setGenres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>
      
      <h1>Movie Genres</h1>
      <div className={styles.genresGrid}>
        {genres.map(genre => (
          <Link 
            key={genre._id} 
            href={`/genres/${genre._id}/movies`}
            className={styles.genreCard}
          >
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const genres = await Genre.find({}).sort({ name: 1 });
  const movies = await Movie.find({}).populate('genre');

  return {
    props: {
      genres: JSON.parse(JSON.stringify(genres)),
      movies: JSON.parse(JSON.stringify(movies))
    }
  };
}