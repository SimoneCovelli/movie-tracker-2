import "./Loading.css";

type LoadingProps = {
  loadingMessage: string;
};

function Loading({ loadingMessage }: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{loadingMessage}</p>
    </div>
  );
}

export default Loading;
