import { Link } from "react-router-dom";
import "./LibraryMovieCard.css";
import blackPoster from "../../assets/black.jpg";
import CardMovieRating from "../CardMovieRating/CardMovieRating";
import CardMovieTags from "../CardMovieTags/CardMovieTags";
import { buildLibraryUrl } from "../../utils/libraryUrl";
import type { LibraryMovie } from "../../types/LibraryMovie";

type LibraryMovieCard = {
  movie: LibraryMovie;
  searchQuery: string;
  statusFilter: string;
  sort: string;
  tagFilter: string;
};

function LibraryMovieCard({
  movie,
  searchQuery,
  statusFilter,
  sort,
  tagFilter,
}: LibraryMovieCard) {
  return (
    <Link
      to={`/myLibrary/movie/${movie.id}`}
      state={{
        from: buildLibraryUrl(searchQuery, statusFilter, sort, tagFilter),
      }}
      className="library-movie-row"
    >
      <img
        src={
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
            : blackPoster
        }
        className="library-movie-poster"
      />

      <div className="library-movie-info">
        <h2 className="library-movie-title">{movie.title}</h2>
        <span className="library-movie-release-date">{movie.releaseDate}</span>

        <CardMovieTags tags={movie.tags}></CardMovieTags>
      </div>

      <div className="library-movie-meta">
        <span className={"library-movie-status " + movie.status}>
          {movie.status === "watched" ? "Watched" : "To watch"}
        </span>

        <CardMovieRating
          status={movie.status}
          rating={movie.rating}
        ></CardMovieRating>
      </div>
    </Link>
  );
}

export default LibraryMovieCard;
