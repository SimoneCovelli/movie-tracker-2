import "./LibraryFilter.css";
import type { FilterOption } from "../../types/FilterOption";

type LibraryFilterProps = {
  options: FilterOption[];
  onValueChange: (value: string) => void;
};

function LibraryFilter({ options, onValueChange }: LibraryFilterProps) {
  return (
    <select
      className="library-filter"
      onChange={(event) => onValueChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default LibraryFilter;
