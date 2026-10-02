import { useState, useEffect } from "react";
import { getLibrary } from "../services/myLibraryServices";
import type { LibraryMovie } from "../types/LibraryMovie";

type UseLibraryMoviesResult = {
  movies: LibraryMovie[];
  loadingMovies: boolean;
  moviesError: string | null;
};

function useLibraryMovies(
  searchQuery: string,
  statusFilter: string,
  sort: string,
  tagFilter: string,
): UseLibraryMoviesResult {
  const [movies, setMovies] = useState<LibraryMovie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [moviesError, setMoviesError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies(): Promise<void> {
      try {
        setLoadingMovies(true);

        const libraryMovies: LibraryMovie[] = await getLibrary(
          searchQuery,
          statusFilter,
          sort,
          tagFilter,
        );

        setMoviesError(null);
        setMovies(libraryMovies);
      } catch (caughtError) {
        console.error(caughtError);
        setMoviesError(
          "We couldn't load the library movies. Please try again later.",
        );

        setMovies([]);
      } finally {
        setLoadingMovies(false);
      }
    }

    loadMovies();
  }, [searchQuery, statusFilter, sort, tagFilter]);

  return { movies, loadingMovies, moviesError };
}

export default useLibraryMovies;
