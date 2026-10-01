import "./LibraryFilter.css";
import type { FilterOption } from "../../types/FilterOption";

type LibraryFilterProps = {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
};

function LibraryFilter({ options, value, onValueChange }: LibraryFilterProps) {
  return (
    <select
      className="library-filter"
      value={value}
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
