import { Movie, MovieDetail, SearchResponse } from '../types/movie';

const API_KEY = 'de368d21';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (title: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`);
    const data: SearchResponse = await response.json();
    
    if (data.Response === 'True') {
      return data.Search;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetail | null> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data: MovieDetail = await response.json();
    
    if (data.Response === 'True') {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};