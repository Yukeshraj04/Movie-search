import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
        />
      </Link>
      <div className="movie-info">
        <Link to={`/movie/${movie.imdbID}`}>
          <h3>{movie.Title}</h3>
        </Link>
        <p>{movie.Year}</p>
        <button
          onClick={() => {
            onToggleFavorite(movie);
            toast.success(isFavorite ? "Removed from favorites!" : "Added to favorites!");
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};
