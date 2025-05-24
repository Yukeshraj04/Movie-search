import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL, API_KEY } from '../constants';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}${API_KEY}&i=${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">← Back to Search</Link>

      <div className="details-container">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"} 
          alt={movie.Title} 
        />
        <div className="details-info">
          <h1>{movie.Title} ({movie.Year})</h1>
          <p><strong>Rating:</strong> {movie.imdbRating}/10</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
