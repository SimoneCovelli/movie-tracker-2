import { useState, useEffect } from "react";
import { getCatalogMovie } from "../services/catalogServices.ts";
import { isMovieInLibrary } from "../services/catalogServices.ts";
import { addToLibrary } from "../services/catalogServices.ts";
import type { Movie } from "../types/Movie";
import type { MovieStatus } from "../types/MovieStatus.ts";

type UseCatalogMovieResult = {
  movie: Movie | null;
  movieInLibrary: boolean;
  loading: boolean;
  error: string | null;
  addMovieToLibrary: (movieStatus: MovieStatus) => Promise<void>;
};

function useCatalogMovie(movieId: string | null): UseCatalogMovieResult {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieInLibrary, setMovieInLibrary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovie(): Promise<void> {
      try {
        setLoading(true);

        const catalogMovie = await getCatalogMovie(movieId);
        const inLibrary = await isMovieInLibrary(movieId);

        setError(null);
        setMovie(catalogMovie);
        setMovieInLibrary(inLibrary);
      } catch (caughtError) {
        console.error(caughtError);
        setError("We couldn't load the movie details. Please try again later.");

        setMovie(null);
        setMovieInLibrary(false);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [movieId]);

  const addMovieToLibrary = async (movieStatus: MovieStatus): Promise<void> => {
    await addToLibrary(movie, movieStatus);
    setMovieInLibrary(true);
  };

  return { movie, movieInLibrary, loading, error, addMovieToLibrary };
}

export default useCatalogMovie;
