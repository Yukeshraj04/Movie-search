import { MovieCard } from "./MovieCard";

export const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites-section">
      <h2>Your Favorites ({favorites.length})</h2>
      <div className="favorites-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
};
