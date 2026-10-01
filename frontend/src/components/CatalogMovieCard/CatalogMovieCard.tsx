import { Link } from "react-router-dom";
import "./CatalogMovieCard.css";
import blackPoster from "../../assets/black.jpg";
import { buildCatalogUrl } from "../../utils/catalogUrl";
import type { Movie } from "../../types/Movie";

type CatalogMovieCardProps = {
  movie: Movie;
  pageNumber: number;
  searchQuery: string;
};

function CatalogMovieCard({
  movie,
  pageNumber,
  searchQuery,
}: CatalogMovieCardProps) {
  return (
    <article className="catalog-movie-card">
      <Link
        to={`/catalog/movie/${movie.id}`}
        state={{ from: buildCatalogUrl(pageNumber, searchQuery) }}
        className="catalog-movie-card-link"
      >
        <img
          src={
            movie.posterPath
              ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
              : blackPoster
          }
          className="catalog-movie-poster"
        ></img>

        <div className="catalog-movie-info">
          <h3 className="catalog-movie-title">{movie.title}</h3>
          <p className="catalog-movie-release-date">{movie.releaseDate}</p>
        </div>
      </Link>
    </article>
  );
}

export default CatalogMovieCard;
