import { useSearchParams } from "react-router-dom";

type UseCatalogParamsResult = {
  searchQuery: string;
  pageNumber: number;
  handleOnSearch: (query: string) => void;
  handlePageChange: (page: number) => void;
};

function useCatalogParams(): UseCatalogParamsResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query");
  const pageParam = searchParams.get("page");

  const searchQuery = queryParam ? queryParam : "";
  const pageNumber = pageParam ? Number(pageParam) : 1;

  const handleOnSearch = (query: string) => {
    setSearchParams({
      ...(query !== "" && { page: "1", query }),
    });
  };

  const handlePageChange = (page: number) => {
    if (page === 1 && searchQuery === "") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      page: page.toString(),
      ...(searchQuery !== "" && { query: searchQuery }),
    });
  };

  return { pageNumber, searchQuery, handlePageChange, handleOnSearch };
}

export default useCatalogParams;
