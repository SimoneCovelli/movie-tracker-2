import { useState, useEffect } from "react";
import "./LibraryToolbar.css";
import SearchInput from "../SearchInput/SearchInput";
import LibraryFilter from "../LibrrayFilter/LibraryFilter";
import type { FilterOption } from "../../types/FilterOption";

type LibraryToolbarProps = {
  onSearch: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  onTagFilterChange: (tag: string) => void;
  tags: string[];
};

const movieStatusOptions: FilterOption[] = [
  { value: "", label: "All movies" },
  { value: "watched", label: "Watched" },
  { value: "to-watch", label: "To watch" },
];

const sortingOptions: FilterOption[] = [
  { value: "", label: "No sorting" },
  { value: "release-desc", label: "Newest releases" },
  { value: "release-asc", label: "Oldest releases" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "rating-desc", label: "Highest rated" },
  { value: "rating-asc", label: "Lowest rated" },
];

function LibraryToolbar({
  onSearch,
  onStatusFilterChange,
  onSortChange,
  onTagFilterChange,
  tags,
}: LibraryToolbarProps) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    onSearch(searchInput);
  }, [searchInput]);

  const tagOptions: FilterOption[] = [
    { value: "", label: "All tags" },
    ...tags.map((tag) => ({
      value: tag,
      label: tag,
    })),
  ];

  return (
    <div className="library-toolbar">
      <div className="library-search">
        <SearchInput
          value={searchInput}
          placeholder="Search by title..."
          onValueChange={setSearchInput}
        ></SearchInput>
      </div>

      <div className="library-filters">
        <LibraryFilter
          options={movieStatusOptions}
          onValueChange={onStatusFilterChange}
        ></LibraryFilter>

        <LibraryFilter
          options={sortingOptions}
          onValueChange={onSortChange}
        ></LibraryFilter>

        <LibraryFilter
          options={tagOptions}
          onValueChange={onTagFilterChange}
        ></LibraryFilter>
      </div>
    </div>
  );
}

export default LibraryToolbar;
