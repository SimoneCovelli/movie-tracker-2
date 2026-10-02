import "./Catalog.css";
import Navbar from "../../components/NavBar/NavBar.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import PageNumber from "../../components/PageNumber/PageNumber.tsx";
import CatalogMovieCard from "../../components/CatalogMovieCard/CatalogMovieCard.tsx";
import LoadingMovies from "../../components/LoadingMovies/LoadingMovies.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import MoviesNotFoundMessage from "../../components/MoviesNotFoundMessage/MoviesNotFoundMessage.tsx";
import useCatalogParams from "../../hooks/useCatalogParams.ts";
import useCatalogMovies from "../../hooks/useCatalogMovies.ts";

function Catalog() {
  const { pageNumber, searchQuery, handlePageChange, handleOnSearch } =
    useCatalogParams();

  const { movies, totalPages, loading, error } = useCatalogMovies(
    pageNumber,
    searchQuery,
  );

  return (
    <>
      <Navbar></Navbar>

      <main>
        <SearchBar onSearch={handleOnSearch}></SearchBar>

        <section className="catalog-container">
          <h3 className="catalog-title">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Popular movies"}
          </h3>

          <PageNumber
            totalPages={totalPages}
            pageNumber={pageNumber}
            onPageChange={handlePageChange}
          ></PageNumber>

          {loading && <LoadingMovies>Loading movies...</LoadingMovies>}

          {!loading && !error && movies.length > 0 && (
            <div className="movie-grid">
              {movies.map((movie) => (
                <CatalogMovieCard
                  key={movie.id}
                  movie={movie}
                  pageNumber={pageNumber}
                  searchQuery={searchQuery}
                ></CatalogMovieCard>
              ))}
            </div>
          )}

          {!loading && !error && movies.length === 0 && (
            <MoviesNotFoundMessage></MoviesNotFoundMessage>
          )}

          {!loading && error && <ErrorMessage error={error}></ErrorMessage>}
        </section>
      </main>
    </>
  );
}

export default Catalog;
