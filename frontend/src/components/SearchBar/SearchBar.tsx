import { useState } from "react";
import "./SearchBar.css";
import SearchInput from "../SearchInput/SearchInput";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleClear = (): void => {
    setSearchInput("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <SearchInput
        value={searchInput}
        placeholder="Search for a movie..."
        onValueChange={setSearchInput}
        onEnter={() => onSearch(searchInput)}
      ></SearchInput>

      <button
        className="search-bar-button search-button"
        onClick={() => onSearch(searchInput)}
      >
        Search
      </button>

      <button className="search-bar-button clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
