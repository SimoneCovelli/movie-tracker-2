export function buildCatalogUrl(
  pageNumber: number,
  searchQuery: string,
): string {
  if (pageNumber === 1 && searchQuery === "") return "/catalog";

  const searchParams = new URLSearchParams();
  searchParams.set("page", pageNumber.toString());
  if (searchQuery !== "") searchParams.set("query", searchQuery);

  return `/catalog?${searchParams.toString()}`;
}
