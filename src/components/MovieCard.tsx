import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import { addFavorite, removeFavorite, isFavorite } from '../services/favoritesService';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  refreshFavorites?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, refreshFavorites }) => {
  const [favorite, setFavorite] = useState(isFavorite(movie.imdbID));

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.imdbID);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
    
    if (refreshFavorites) {
      refreshFavorites();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        {movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        ) : (
          <div className={styles.noPoster}>No Poster Available</div>
        )}
      </div>
      <div className={styles.info}>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <div className={styles.actions}>
          <Link to={`/movie/${movie.imdbID}`} className={styles.moreInfoBtn}>
            More Info
          </Link>
          <button 
            className={`${styles.favoriteBtn} ${favorite ? styles.active : ''}`}
            onClick={handleFavoriteClick}
          >
            {favorite ? '★' : '☆'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;