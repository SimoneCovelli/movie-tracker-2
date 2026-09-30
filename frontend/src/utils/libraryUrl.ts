export function buildLibraryUrl(
  searchQuery: string,
  statusFilter: string,
  sort: string,
  tagFilter: string,
): string {
  const searchParams = new URLSearchParams();

  if (searchQuery !== "") searchParams.set("query", searchQuery);
  if (statusFilter !== "") searchParams.set("status", statusFilter);
  if (sort !== "") searchParams.set("sort", sort);
  if (tagFilter !== "") searchParams.set("tag", tagFilter);

  return `/myLibrary?${searchParams.toString()}`;
}
