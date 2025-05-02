import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/movieService';
import { MovieDetail } from '../types/movie';
import { addFavorite, removeFavorite, isFavorite } from '../services/favoritesService';
import styles from './MovieDetails.module.css';

const MovieDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        const movieData = await getMovieDetails(id);
        if (movieData) {
          setMovie(movieData);
          setFavorite(isFavorite(id));
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (favorite) {
      removeFavorite(movie.imdbID);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error || !movie) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error || 'Movie not found'}</p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button 
          className={`${styles.favoriteButton} ${favorite ? styles.active : ''}`}
          onClick={handleFavoriteToggle}
        >
          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>

      <div className={styles.movieInfo}>
        <div className={styles.posterContainer}>
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} className={styles.poster} />
          ) : (
            <div className={styles.noPoster}>No Poster Available</div>
          )}
        </div>

        <div className={styles.details}>
          <h1>{movie.Title} <span className={styles.year}>({movie.Year})</span></h1>
          
          <div className={styles.meta}>
            {movie.Rated !== 'N/A' && <span>{movie.Rated}</span>}
            {movie.Runtime !== 'N/A' && <span>{movie.Runtime}</span>}
            {movie.Released !== 'N/A' && <span>{movie.Released}</span>}
          </div>
          
          {movie.Genre !== 'N/A' && (
            <div className={styles.section}>
              <h3>Genre</h3>
              <p>{movie.Genre}</p>
            </div>
          )}
          
          {movie.Director !== 'N/A' && (
            <div className={styles.section}>
              <h3>Director</h3>
              <p>{movie.Director}</p>
            </div>
          )}
          
          {movie.Plot !== 'N/A' && (
            <div className={styles.section}>
              <h3>Plot</h3>
              <p>{movie.Plot}</p>
            </div>
          )}
          
          {movie.Actors !== 'N/A' && (
            <div className={styles.section}>
              <h3>Cast</h3>
              <p>{movie.Actors}</p>
            </div>
          )}
          
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className={styles.section}>
              <h3>Ratings</h3>
              <div className={styles.ratings}>
                {movie.Ratings.map((rating: { Source: string; Value: string }, index: number) => (
                  <div key={index} className={styles.rating}>
                    <span className={styles.ratingSource}>{rating.Source}:</span>
                    <span className={styles.ratingValue}>{rating.Value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;