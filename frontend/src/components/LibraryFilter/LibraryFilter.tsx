import "./LibraryFilter.css";
import type { FilterOption } from "../../types/FilterOption";

type LibraryFilterProps = {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

function LibraryFilter({
  options,
  value,
  onValueChange,
  disabled,
}: LibraryFilterProps) {
  return (
    <select
      className="library-filter"
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      disabled={disabled}
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
