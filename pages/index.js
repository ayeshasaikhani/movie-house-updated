import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        // Sort by rating and take top 5
        const topMovies = data.sort((a, b) => b.rating - a.rating).slice(0, 5);
        setTrendingMovies(topMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <Link href={`/help/faqs`} className={styles.navLink}>
          Ask Questions
        </Link>
        <Link href={`/help/contact`} className={styles.navLink}>
          Contact Us
        </Link>
        <Link href={`/help/privacy`} className={styles.navLink}>
          Privacy Policy
        </Link>
      </div>
      
      <div>
        <h1>Trending Movies</h1>
        <div className={styles.moviesContainer}>
          {trendingMovies.map(movie => (
            <div key={movie._id} className={styles.movieCard}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.movieDescription}>{movie.description}</p>
              <div className={styles.movieDetails}>
                <p>Director: {movie.director?.name}</p>
                <p>Genre: {movie.genre?.name}</p>
                <p>Rating: {movie.rating}/10</p>
              </div>
              <Link href={`/movies/${movie._id}`} className={styles.detailsLink}>
                View Details
              </Link>
            </div>
          ))}
        </div>
        <button 
          onClick={() => router.push('/genres')}
          className={styles.genreButton}
        >
          Browse Genres
        </button>
      </div>
    </div>
  );
}