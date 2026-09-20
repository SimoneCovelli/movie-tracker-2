import "./SearchInput.css";

type SearchInputProps = {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  onEnter?: () => void;
};

function SearchInput({
  value,
  placeholder,
  onValueChange,
  onEnter,
}: SearchInputProps) {
  return (
    <input
      type="search"
      className="search-input"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") onEnter?.();
      }}
    />
  );
}

export default SearchInput;
