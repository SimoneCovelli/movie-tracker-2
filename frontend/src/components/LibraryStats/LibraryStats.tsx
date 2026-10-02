import "./LibraryStats.css";
import type { LibraryCounts } from "../../types/LibraryCounts";

type LibraryStatsProps = {
  movieCounts: LibraryCounts | null;
};

function LibraryStats({ movieCounts }: LibraryStatsProps) {
  return (
    <>
      {movieCounts && (
        <div className="library-stats">
          <span>{movieCounts.total} movies</span>
          <span>{movieCounts.watched} watched</span>
          <span>{movieCounts.toWatch} to watch</span>
        </div>
      )}

      {!movieCounts && (
        <div className="library-stats">Movie counts unavailable</div>
      )}
    </>
  );
}

export default LibraryStats;
