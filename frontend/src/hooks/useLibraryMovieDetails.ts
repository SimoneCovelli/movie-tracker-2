import { useState, useEffect } from "react";
import type { LibraryMovie } from "../types/LibraryMovie";
import type { MovieStatus } from "../types/MovieStatus";

type useLibraryMovieDetailsResult = {
  movieStatus: MovieStatus;
  movieRating: number | null;
  movieTags: string[];
  setMovieStatus: React.Dispatch<React.SetStateAction<MovieStatus>>;
  setMovieRating: React.Dispatch<React.SetStateAction<number | null>>;
  setMovieTags: React.Dispatch<React.SetStateAction<string[]>>;
};

function useLibraryMovieDetails(
  movie: LibraryMovie | null,
): useLibraryMovieDetailsResult {
  const [movieStatus, setMovieStatus] = useState<MovieStatus>("to-watch");
  const [movieRating, setMovieRating] = useState<number | null>(null);
  const [movieTags, setMovieTags] = useState<string[]>([]);

  useEffect(() => {
    if (!movie) return;

    setMovieStatus(movie.status);
    setMovieRating(movie.rating);
    setMovieTags(movie.tags);
  }, [movie]);

  return {
    movieStatus,
    movieRating,
    movieTags,
    setMovieStatus,
    setMovieRating,
    setMovieTags,
  };
}

export default useLibraryMovieDetails;
