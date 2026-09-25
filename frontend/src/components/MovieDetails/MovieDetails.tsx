import "./MovieDetails.css";
import blackPoster from "../../assets/black.jpg";
import type { Movie } from "../../types/Movie";

type MovieDetailsProps = {
  movie: Movie;
  children: React.ReactNode;
};

function MovieDetails({ movie, children }: MovieDetailsProps) {
  return (
    <div className="movie-header">
      <img
        src={
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
            : blackPoster
        }
        className="movie-poster"
      />

      <div className="movie-summary">
        <h1>{movie.title}</h1>
        <p className="movie-original-title">{movie.originalTitle}</p>

        <div className="movie-info">
          <div className="movie-info-row">
            <span className="movie-info-label">Release date</span>
            <span>{movie.releaseDate}</span>
          </div>

          <div className="movie-info-row">
            <span className="movie-info-label">Original language</span>
            <span>{movie.originalLanguage}</span>
          </div>
        </div>

        <div className="movie-overview">
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>

        {children}
      </div>
    </div>
  );
}

export default MovieDetails;
