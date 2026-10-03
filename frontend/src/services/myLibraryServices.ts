import type { LibraryCounts } from "../types/LibraryCounts";
import type { LibraryMovie } from "../types/LibraryMovie";

async function checkResponse(response: Response): Promise<void> {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
}

export async function getTags(): Promise<string[]> {
  const params = new URLSearchParams({
    action: "getTags",
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovies.php?${params}`,
  );

  await checkResponse(response);

  const tags: string[] = await response.json();
  return tags;
}

export async function getLibraryCounts(): Promise<LibraryCounts> {
  const params = new URLSearchParams({
    action: "getMovieCounts",
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovies.php?${params}`,
  );

  await checkResponse(response);

  const counts: LibraryCounts = await response.json();
  return counts;
}

export async function getLibrary(
  searchQuery: string,
  statusFilter: string,
  sort: string,
  tagFilter: string,
): Promise<LibraryMovie[]> {
  const params = new URLSearchParams({
    action: "getMovies",
    query: searchQuery,
    status: statusFilter,
    sort: sort,
    tag: tagFilter,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovies.php?${params}`,
  );

  await checkResponse(response);

  const library: LibraryMovie[] = await response.json();
  return library;
}

export async function getLibraryMovie(
  movieId: string | null,
): Promise<LibraryMovie> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "getMovie",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovie.php?${params}`,
  );

  await checkResponse(response);

  const movie: LibraryMovie | null = await response.json();
  if (!movie) throw new Error(`No movie found with ID "${movieId}"`);
  return movie;
}

export async function updateMovieStatus(
  movieId: string | null,
  status: string,
): Promise<void> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "updateStatus",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovie.php?${params}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    },
  );

  await checkResponse(response);
}

export async function updateMovieRating(
  movieId: string | null,
  rating: number | null,
): Promise<void> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "updateRating",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovie.php?${params}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
      }),
    },
  );

  await checkResponse(response);
}

export async function updateMovieTags(
  movieId: string | null,
  tags: string[],
): Promise<void> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "updateTags",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovie.php?${params}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tags,
      }),
    },
  );

  await checkResponse(response);
}

export async function deleteMovie(movieId: string | null): Promise<void> {
  if (!movieId) throw new Error("Movie ID is missing");

  const params = new URLSearchParams({
    action: "deleteMovie",
    id: movieId,
  });

  const response = await fetch(
    `http://localhost:8000/api/myLibrary/myLibraryMovie.php?${params}`,
    {
      method: "DELETE",
    },
  );

  await checkResponse(response);
}
