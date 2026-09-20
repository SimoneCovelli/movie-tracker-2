import "./Catalog.css";
import Navbar from "../../components/NavBar/NavBar.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import PageNumber from "../../components/PageNumber/PageNumber.tsx";
import CatalogMovieCard from "../../components/CatalogMovieCard/CatalogMovieCard.tsx";
import Loading from "../../components/Loading/Loading.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
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

        <div className="catalog-container">
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

          {loading && <Loading loadingMessage="Loading movies..."></Loading>}

          {!loading && !error && movies.length > 0 && (
            <div className="movie-grid">
              {movies.map((movie) => (
                <CatalogMovieCard
                  key={movie.id}
                  movie={movie}
                ></CatalogMovieCard>
              ))}
            </div>
          )}

          {!loading && !error && movies.length === 0 && (
            <section className="movies-not-found">
              <h1>No movies found</h1>
              <p>Sorry, we couldn't find any movies.</p>
            </section>
          )}

          {!loading && error && <ErrorMessage error={error}></ErrorMessage>}
        </div>
      </main>
    </>
  );
}

export default Catalog;
