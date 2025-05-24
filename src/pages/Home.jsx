import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { Favorites } from '../components/Favorites';
import { API_URL, API_KEY } from '../constants';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [query, setQuery] = useState("");

  const searchMovies = async (query) => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(`${API_URL}${API_KEY}&s=${query}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    setFavorites(
      isFavorite 
      ? favorites.filter(fav => fav.imdbID !== movie.imdbID)
      : [...favorites, movie]
    );
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={searchMovies} query={query} setQuery={setQuery} />
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      {favorites.length > 0 && (
        <Favorites favorites={favorites} onRemoveFavorite={toggleFavorite} />
      )}
    </div>
  );
}
