import "./MovieStatusSelect.css";
import type { MovieStatus } from "../../types/MovieStatus";

type MovieStatusSelectProps = {
  value: MovieStatus;
  onValueChange: (status: MovieStatus) => void;
};

function MovieStatusSelect({ value, onValueChange }: MovieStatusSelectProps) {
  return (
    <select
      className="movie-status-select"
      value={value}
      onChange={(event) => onValueChange(event.target.value as MovieStatus)}
    >
      <option value="to-watch">To watch</option>
      <option value="watched">Watched</option>
    </select>
  );
}

export default MovieStatusSelect;
