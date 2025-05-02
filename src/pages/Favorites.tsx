import React, { useState, useEffect } from 'react';
import { getFavorites } from '../services/favoritesService';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import styles from './Favorites.module.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const loadFavorites = () => {
    const favoritesData = getFavorites();
    setFavorites(favoritesData);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className={styles.container}>
      <h1>My Favorites</h1>
      
      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>
          You haven't added any movies to your favorites yet.
        </p>
      ) : (
        <div className={styles.results}>
          {favorites.map(movie => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              refreshFavorites={loadFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;