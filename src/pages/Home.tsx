import React, { useState, FormEvent } from 'react';
import { searchMovies } from '../services/movieService';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import styles from './Home.module.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(searchTerm);
      setMovies(results);
      
      if (results.length === 0) {
        setError('No movies found. Try another search term.');
      }
    } catch (err) {
      setError('An error occurred while searching for movies.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.results}>
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;