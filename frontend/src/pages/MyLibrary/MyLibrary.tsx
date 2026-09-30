import { useEffect, useState } from "react";
import "./MyLibrary.css";
import Navbar from "../../components/NavBar/NavBar.tsx";
import LibraryToolbar from "../../components/LibraryToolbar/LibraryToolbar.tsx";
import LibraryStats from "../../components/LibraryStats/LibraryStats.tsx";
import Loading from "../../components/Loading/Loading.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import MoviesNotFoundMessage from "../../components/MoviesNotFoundMessage/MoviesNotFoundMessage.tsx";
import LibraryMovieCard from "../../components/LibraryMovieCard/LibraryMovieCard.tsx";
import useLibraryParams from "../../hooks/useLibraryParams.ts";
import useLibraryMovies from "../../hooks/useLibraryMovies.ts";
import { getTags, getLibraryCounts } from "../../services/myLibraryServices.ts";
import type { LibraryCounts } from "../../types/LibraryCounts.ts";

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
  } = useLibraryParams();

  const { movies, loading, error } = useLibraryMovies(
    searchQuery,
    statusFilter,
    sort,
    tagFilter,
  );

  const [movieTags, setMovieTags] = useState<string[]>([]);
  const [movieCounts, setMovieCounts] = useState<LibraryCounts | null>(null);

  useEffect(() => {
    async function loadTags(): Promise<void> {
      try {
        const tags = await getTags();
        setMovieTags(tags);
      } catch (caughtError) {
        console.error(caughtError);
        setMovieTags([]);
      }
    }

    async function loadCounts(): Promise<void> {
      try {
        const counts = await getLibraryCounts();
        setMovieCounts(counts);
      } catch (caughtError) {
        console.error(caughtError);
        setMovieCounts(null);
      }
    }

    loadTags();
    loadCounts();
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <main>
        <div className="library-header">
          <h1>My Movie Library</h1>

          {movieCounts && (
            <LibraryStats
              total={movieCounts.total}
              watched={movieCounts.watched}
              toWatch={movieCounts.toWatch}
            ></LibraryStats>
          )}

          {!movieCounts && (
            <div className="library-stats">Movie count unavailable</div>
          )}
        </div>

        <LibraryToolbar
          onSearch={handleOnSearch}
          tags={movieTags}
          onStatusFilterChange={handleStatusFilterChange}
          onSortChange={handleSortChange}
          onTagFilterChange={handleTagFilterChange}
        ></LibraryToolbar>

        {loading && <Loading loadingMessage="Loading movies..."></Loading>}

        {!loading && movieCounts && (
          <div className="results-info">
            Showing {movies.length} of {movieCounts.total}{" "}
            {movieCounts.total === 1 ? "movie" : "movies"}
          </div>
        )}

        {!loading && !movieCounts && (
          <div className="results-info">Movie count unavailable</div>
        )}

        {!loading && !error && movies.length > 0 && (
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

        {!loading && !error && movies.length === 0 && (
          <MoviesNotFoundMessage></MoviesNotFoundMessage>
        )}

        {!loading && error && <ErrorMessage error={error}></ErrorMessage>}

        {/* <div
          id="library-success-message"
          className="success-message hidden"
        ></div> */}
      </main>
    </>
  );
}

export default MyLibrary;
