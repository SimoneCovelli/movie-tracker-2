import { useState, useEffect } from "react";
import { getLibraryMovie } from "../services/myLibraryServices.ts";
import type { LibraryMovie } from "../types/LibraryMovie.ts";

type useLibraryMovieResult = {
  movie: LibraryMovie | null;
  loading: boolean;
  error: string | null;
};

function useLibraryMovie(movieId: string | null): useLibraryMovieResult {
  const [movie, setMovie] = useState<LibraryMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      try {
        setLoading(true);

        const libraryMovie = await getLibraryMovie(movieId);

        setError(null);
        setMovie(libraryMovie);
      } catch (caughtError) {
        console.error(caughtError);
        setError("We couldn't load the movie details. Please try again later.");

        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [movieId]);

  return { movie, loading, error };
}

export default useLibraryMovie;
