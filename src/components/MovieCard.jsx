import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <button
          onClick={() => {
            onToggleFavorite(movie);
            toast.success(
              isFavorite ? "Removed from favorites!" : "Added to favorites!"
            );
          }}
        >
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};