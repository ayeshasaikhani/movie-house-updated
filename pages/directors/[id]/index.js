import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './DirectorDetails.module.css';

export default function DirectorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDirector = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/directors/${id}`);
        if (!response.ok) throw new Error('Failed to fetch director');
        const data = await response.json();
        setDirector(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDirector();
  }, [id]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!director) return <div className={styles.container}>Director not found</div>;

  return (
    <div className={styles.container}>
      <Link href="/directors" className={styles.backLink}>← Back to Directors</Link>
      
      <div className={styles.directorDetails}>
        <h1>{director.name}</h1>
        <div className={styles.directorInfo}>
          <div className={styles.bio}>
            <h2>Biography</h2>
            <p>{director.bio}</p>
            <div className={styles.metaInfo}>
              <p><strong>Birth Year:</strong> {director.birthYear}</p>
              <p><strong>Nationality:</strong> {director.nationality}</p>
            </div>
          </div>
          
          <div className={styles.movies}>
            <h2>Movies Directed</h2>
            <div className={styles.moviesGrid}>
              {director.movies?.map(movie => (
                <div key={movie._id} className={styles.movieCard}>
                  <h3>{movie.title}</h3>
                  <p>{movie.description}</p>
                  <div className={styles.movieMeta}>
                    <p>Genre: {movie.genre?.name}</p>
                    <p>Rating: {movie.rating}/10</p>
                  </div>
                  <Link href={`/movies/${movie._id}`} className={styles.detailsLink}>
                    View Movie
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 