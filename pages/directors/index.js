import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Directors.module.css';

export default function Directors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await fetch('/api/directors');
        if (!response.ok) throw new Error('Failed to fetch directors');
        const data = await response.json();
        setDirectors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectors();
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>
      
      <h1>Movie Directors</h1>
      <div className={styles.directorsGrid}>
        {directors.map(director => (
          <Link 
            key={director._id} 
            href={`/directors/${director._id}`}
            className={styles.directorCard}
          >
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <p className={styles.movieCount}>
              {director.movieCount} Movies
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
} 