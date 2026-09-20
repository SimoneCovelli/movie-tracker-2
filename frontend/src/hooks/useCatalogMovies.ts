import { useState, useEffect } from "react";
import { getCatalogMovies } from "../services/catalogServices";
import type { Movie } from "../types/Movie";

type UseCatalogMoviesResult = {
  movies: Movie[];
  totalPages: number;
  loading: boolean;
  error: string | null;
};

function useCatalogMovies(
  pageNumber: number,
  searchQuery: string,
): UseCatalogMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies(): Promise<void> {
      try {
        setLoading(true);

        const { movies: catalogMovies, totalPages: catalogTotalPages } =
          await getCatalogMovies(pageNumber, searchQuery);

        setError(null);
        setMovies(catalogMovies);
        setTotalPages(catalogTotalPages);
      } catch (caughtError) {
        console.error(caughtError);
        setError(
          "We couldn't load the catalog movies. Please try again later.",
        );

        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [pageNumber, searchQuery]);

  return { movies, totalPages, loading, error };
}

export default useCatalogMovies;
