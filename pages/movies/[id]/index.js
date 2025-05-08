import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!movie) return <div className={styles.container}>Movie not found</div>;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>
      
      <div className="card">
        <h1>{movie.title}</h1>
        <div className={styles.movieInfo}>
          <div className={styles.poster}>
            <img src={movie.posterUrl} alt={movie.title} />
          </div>
          <div className={styles.details}>
            <p className={styles.description}>{movie.description}</p>
            <div className={styles.metaInfo}>
              <p><strong>Director:</strong> {movie.director?.name}</p>
              <p><strong>Genre:</strong> {movie.genre?.name}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> {movie.rating}/10</p>
            </div>
            <div className={styles.actions}>
              <Link href={`/directors/${movie.director?._id}`} className={styles.link}>
                View Director's Profile
              </Link>
              <Link href={`/genres/${movie.genre?._id}/movies`} className={styles.link}>
                More {movie.genre?.name} Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}