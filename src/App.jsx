import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SearchBar } from "./components/SearchBar";
import { MovieCard } from "./components/MovieCard";
import { Favorites } from "./components/Favorites";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, API_KEY } from "./constants";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      toast.warning("Please enter a movie title!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}${API_KEY}&s=${query}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error || "No movies found!");
        toast.error(response.data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies. Check your connection.");
      toast.error("API request failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    setFavorites(
      isFavorite
        ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...favorites, movie]
    );
    toast.success(
      isFavorite ? "Removed from favorites!" : "Added to favorites!"
    );
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar 
        onSearch={searchMovies} 
        query={query} 
        setQuery={setQuery} 
      />
      
      {isLoading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          onRemoveFavorite={toggleFavorite}
        />
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}