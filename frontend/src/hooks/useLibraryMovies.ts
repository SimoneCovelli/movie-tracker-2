import { useState, useEffect } from "react";
import { getLibrary } from "../services/myLibraryServices";
import type { LibraryMovie } from "../types/LibraryMovie";

type UseLibraryMoviesResult = {
  movies: LibraryMovie[];
  loading: boolean;
  error: string | null;
};

function useLibraryMovies(
  searchQuery: string,
  statusFilter: string,
  sort: string,
  tagFilter: string,
): UseLibraryMoviesResult {
  const [movies, setMovies] = useState<LibraryMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies(): Promise<void> {
      try {
        setLoading(true);

        const libraryMovies: LibraryMovie[] = await getLibrary(
          searchQuery,
          statusFilter,
          sort,
          tagFilter,
        );

        setError(null);
        setMovies(libraryMovies);
      } catch (caughtError) {
        console.error(caughtError);
        setError(
          "We couldn't load the library movies. Please try again later.",
        );

        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [searchQuery, statusFilter, sort, tagFilter]);

  return { movies, loading, error };
}

export default useLibraryMovies;
