import "./LoadingMovies.css";

type LoadingMoviesProps = {
  children: string;
};

function LoadingMovies({ children }: LoadingMoviesProps) {
  return (
    <div className="loading-movies-container">
      <div className="loading-movies-spinner"></div>
      <p>{children}</p>
    </div>
  );
}

export default LoadingMovies;
