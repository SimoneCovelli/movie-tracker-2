import type { Movie } from "../types/Movie";
import type { TmdbResponse } from "../types/TmdbResponse";

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
