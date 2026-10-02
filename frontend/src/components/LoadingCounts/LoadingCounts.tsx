import "./LoadingCounts.css";

type LoadingCountsProps = {
  children: string;
};

function LoadingCounts({ children }: LoadingCountsProps) {
  return (
    <div className="loading-counts-container">
      <div className="loading-counts-spinner"></div>
      <p>{children}</p>
    </div>
  );
}

export default LoadingCounts;
