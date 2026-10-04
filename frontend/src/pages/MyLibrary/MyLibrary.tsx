import "./MyLibrary.css";
import Navbar from "../../components/NavBar/NavBar.tsx";
import LibraryToolbar from "../../components/LibraryToolbar/LibraryToolbar.tsx";
import LibraryStats from "../../components/LibraryStats/LibraryStats.tsx";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import InlineLoader from "../../components/InlineLoader/InlineLoader.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import MoviesNotFoundMessage from "../../components/MoviesNotFoundMessage/MoviesNotFoundMessage.tsx";
import LibraryMovieCard from "../../components/LibraryMovieCard/LibraryMovieCard.tsx";
import LibraryResultsCount from "../../components/LibraryResultsCount/LibraryResultsCounts.tsx";
import useLibraryParams from "../../hooks/useLibraryParams.ts";
import useLibraryMovies from "../../hooks/useLibraryMovies.ts";
import useLibraryTags from "../../hooks/useLibraryTags.ts";
import useLibraryCounts from "../../hooks/useLibraryCounts.ts";

function MyLibrary() {
  const {
    searchQuery,
    statusFilter,
    sort,
    tagFilter,
    handleOnSearch,
    handleStatusFilterChange,
    handleSortChange,
    handleTagFilterChange,
    handleReset,
  } = useLibraryParams();

  const { movies, loadingMovies, moviesError } = useLibraryMovies(
    searchQuery,
    statusFilter,
    sort,
    tagFilter,
  );

  const { libraryTags, loadingTags } = useLibraryTags();
  const { movieCounts, loadingCounts } = useLibraryCounts();

  return (
    <>
      <Navbar></Navbar>

      <main>
        <section className="library-header">
          <h1>My Movie Library</h1>

          {loadingCounts ? (
            <InlineLoader>Loading movie counts...</InlineLoader>
          ) : (
            <LibraryStats movieCounts={movieCounts}></LibraryStats>
          )}
        </section>

        <LibraryToolbar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          sort={sort}
          tagFilter={tagFilter}
          tags={libraryTags}
          loadingTags={loadingTags}
          onSearch={handleOnSearch}
          onStatusFilterChange={handleStatusFilterChange}
          onSortChange={handleSortChange}
          onTagFilterChange={handleTagFilterChange}
          onReset={handleReset}
        ></LibraryToolbar>

        <section className="library-results">
          {loadingCounts ? (
            <InlineLoader>Loading results count...</InlineLoader>
          ) : (
            <LibraryResultsCount
              displayedMovieCount={movies.length}
              movieCounts={movieCounts}
            ></LibraryResultsCount>
          )}

          {loadingMovies ? (
            <PageLoader>Loading movies...</PageLoader>
          ) : moviesError ? (
            <ErrorMessage error={moviesError}></ErrorMessage>
          ) : movies.length === 0 ? (
            <MoviesNotFoundMessage></MoviesNotFoundMessage>
          ) : (
            <div className="movie-list">
              {movies.map((movie) => (
                <LibraryMovieCard
                  key={movie.id}
                  movie={movie}
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                  sort={sort}
                  tagFilter={tagFilter}
                ></LibraryMovieCard>
              ))}
            </div>
          )}
        </section>

        {/* <div
          id="library-success-message"
          className="success-message hidden"
        ></div> */}
      </main>
    </>
  );
}

export default MyLibrary;
