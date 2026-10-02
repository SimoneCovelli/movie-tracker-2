import "./LibraryResultsCount.css";
import type { LibraryCounts } from "../../types/LibraryCounts";

type LibraryResultsCountProps = {
  displayedMovieCount: number;
  movieCounts: LibraryCounts | null;
};

function LibraryResultsCount({
  displayedMovieCount,
  movieCounts,
}: LibraryResultsCountProps) {
  return (
    <>
      {movieCounts && (
        <div className="results-count">
          Showing {displayedMovieCount} of {movieCounts.total}{" "}
          {movieCounts.total === 1 ? "movie" : "movies"}
        </div>
      )}

      {!movieCounts && (
        <div className="results-count">Results count unavailable</div>
      )}
    </>
  );
}

export default LibraryResultsCount;
