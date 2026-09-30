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

  const tags = await response.json();
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
