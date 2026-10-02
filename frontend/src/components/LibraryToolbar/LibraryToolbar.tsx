import "./LibraryToolbar.css";
import SearchInput from "../SearchInput/SearchInput";
import LibraryFilter from "../LibraryFilter/LibraryFilter";
import type { FilterOption } from "../../types/FilterOption";

type LibraryToolbarProps = {
  searchQuery: string;
  statusFilter: string;
  sort: string;
  tagFilter: string;
  tags: string[];
  loadingTags: boolean;
  onSearch: (query: string) => void;
  onStatusFilterChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  onTagFilterChange: (tag: string) => void;
  onReset: () => void;
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
  searchQuery,
  statusFilter,
  sort,
  tagFilter,
  tags,
  loadingTags,
  onSearch,
  onStatusFilterChange,
  onSortChange,
  onTagFilterChange,
  onReset,
}: LibraryToolbarProps) {
  const tagOptions: FilterOption[] = [
    {
      value: "",
      label: loadingTags ? "Loading tags..." : "All tags",
    },
    ...tags.map((tag) => ({
      value: tag,
      label: tag,
    })),
  ];

  return (
    <div className="library-toolbar">
      <div className="library-search">
        <SearchInput
          value={searchQuery}
          placeholder="Search by title..."
          onValueChange={onSearch}
        ></SearchInput>
      </div>

      <div className="library-toolbar-actions">
        <div className="library-filters">
          <LibraryFilter
            options={movieStatusOptions}
            value={statusFilter}
            onValueChange={onStatusFilterChange}
          ></LibraryFilter>

          <LibraryFilter
            options={sortingOptions}
            value={sort}
            onValueChange={onSortChange}
          ></LibraryFilter>

          <LibraryFilter
            options={tagOptions}
            value={tagFilter}
            onValueChange={onTagFilterChange}
            disabled={loadingTags}
          ></LibraryFilter>
        </div>

        <button className="reset-library-filters-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default LibraryToolbar;
