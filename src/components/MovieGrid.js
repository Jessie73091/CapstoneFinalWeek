import React from 'react'; // Add React import here
import { Link } from 'react-router-dom';
import '../MovieGrid.css';

function MovieGrid({ movies }) {
  return (
    <div>
      <h1>Search Results</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-link">
            <div className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p className="movie-title">{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
