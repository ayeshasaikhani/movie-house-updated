import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './GenreMovies.module.css';

export default function GenreMovies() {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        // Fetch genre details
        const genreResponse = await fetch(`/api/genres/${id}`);
        if (!genreResponse.ok) throw new Error('Failed to fetch genre');
        const genreData = await genreResponse.json();
        setGenre(genreData);

        // Fetch movies in this genre
        const moviesResponse = await fetch(`/api/genres/${id}/movies`);
        if (!moviesResponse.ok) throw new Error('Failed to fetch movies');
        const moviesData = await moviesResponse.json();
        setMovies(moviesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!genre) return <div className={styles.container}>Genre not found</div>;

  return (
    <div className={styles.container}>
      <Link href="/genres" className={styles.backLink}>← Back to Genres</Link>
      
      <h1>{genre.name} Movies</h1>
      <p className={styles.description}>{genre.description}</p>
      
      <div className={styles.moviesGrid}>
        {movies.map(movie => (
          <div key={movie._id} className={styles.movieCard}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div className={styles.movieDetails}>
              <p>Director: {movie.director?.name}</p>
              <p>Rating: {movie.rating}/10</p>
            </div>
            <Link href={`/movies/${movie._id}`} className={styles.detailsLink}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 