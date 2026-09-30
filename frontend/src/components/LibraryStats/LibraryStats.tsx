import "./LibraryStats.css";

type LibraryStatsProps = {
  total: number;
  watched: number;
  toWatch: number;
};

function LibraryStats({ total, watched, toWatch }: LibraryStatsProps) {
  return (
    <div className="library-stats">
      <span>{total} movies</span>
      <span>{watched} watched</span>
      <span>{toWatch} to watch</span>
    </div>
  );
}

export default LibraryStats;
