import type { Movie } from "../types/Movie";
import type { TmdbResponse } from "../types/TmdbResponse";
import type { TmdbMovie } from "../types/TmdbMovie";

async function checkResponse(response: Response): Promise<void> {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
}

export async function getCatalogMovies(
  page: number = 1,
  query: string = "",
): Promise<{
  movies: Movie[];
  totalPages: number;
}> {
  const params = new URLSearchParams({
    action: "getMovies",
    language: "it-IT",
    query: query,
    page: page.toString(),
  });

  const response = await fetch(
    `http://localhost:8000/api/catalog/catalogMovies.php?${params}`,
  );

  await checkResponse(response);

  const data: TmdbResponse = await response.json();

  const movies = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path ?? null,
    releaseDate: movie.release_date,
  }));

  const totalPages = Math.min(data.total_pages, 500);

  return { movies, totalPages };
}

export async function getCatalogMovie(movieId: string | null): Promise<Movie> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "getMovie",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/catalog/catalogMovie.php?${params}`,
  );

  await checkResponse(response);

  const data: TmdbMovie = await response.json();

  const movie = {
    id: data.id,
    title: data.title,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
  };

  return movie;
}

export async function isMovieInLibrary(
  movieId: string | null,
): Promise<boolean> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "checkMovie",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovies.php?${params}`,
  );

  await checkResponse(response);

  const data = await response.json();
  return data.inLibrary;
}

export async function addToLibrary(
  movie: Movie | null,
  status: string,
): Promise<void> {
  if (!movie) throw new Error("Movie is missing");

  const params = new URLSearchParams({
    action: "addMovie",
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovies.php?${params}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        originalLanguage: movie.originalLanguage,
        originalTitle: movie.originalTitle,
        overview: movie.overview,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        status: status,
      }),
    },
  );

  await checkResponse(response);
}
