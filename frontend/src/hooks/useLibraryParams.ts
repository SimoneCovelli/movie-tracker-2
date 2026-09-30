import { useSearchParams } from "react-router-dom";

type useLibraryParamsResult = {
  searchQuery: string;
  statusFilter: string;
  sort: string;
  tagFilter: string;
  handleOnSearch: (query: string) => void;
  handleStatusFilterChange: (status: string) => void;
  handleSortChange: (sort: string) => void;
  handleTagFilterChange: (tag: string) => void;
};

function useLibraryParams(): useLibraryParamsResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query");
  const statusParam = searchParams.get("status");
  const sortParam = searchParams.get("sort");
  const tagParam = searchParams.get("tag");

  const searchQuery = queryParam ? queryParam : "";
  const statusFilter = statusParam ? statusParam : "";
  const sort = sortParam ? sortParam : "";
  const tagFilter = tagParam ? tagParam : "";

  const updateSearchParams = (
    query: string,
    status: string,
    sort: string,
    tag: string,
  ) => {
    const newSearchParams = new URLSearchParams();

    if (query !== "") newSearchParams.set("query", query);
    if (status !== "") newSearchParams.set("status", status);
    if (sort !== "") newSearchParams.set("sort", sort);
    if (tag !== "") newSearchParams.set("tag", tag);

    setSearchParams(newSearchParams);
  };

  const handleOnSearch = (query: string) => {
    updateSearchParams(query, statusFilter, sort, tagFilter);
  };

  const handleStatusFilterChange = (status: string) => {
    updateSearchParams(searchQuery, status, sort, tagFilter);
  };

  const handleSortChange = (sort: string) => {
    updateSearchParams(searchQuery, statusFilter, sort, tagFilter);
  };

  const handleTagFilterChange = (tag: string) => {
    updateSearchParams(searchQuery, statusFilter, sort, tag);
  };

  return {
    searchQuery,
    statusFilter,
    sort,
    tagFilter,
    handleOnSearch,
    handleStatusFilterChange,
    handleSortChange,
    handleTagFilterChange,
  };
}

export default useLibraryParams;
