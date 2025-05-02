import { Movie } from '../types/movie';

const FAVORITES_KEY = 'movieBrowserFavorites';

export const getFavorites = (): Movie[] => {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const addFavorite = (movie: Movie): void => {
  const favorites = getFavorites();
  
  if (!favorites.some(favorite => favorite.imdbID === movie.imdbID)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (imdbID: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const isFavorite = (imdbID: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(movie => movie.imdbID === imdbID);
};