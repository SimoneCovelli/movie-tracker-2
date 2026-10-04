import "./PageLoader.css";

type PageLoaderProps = {
  children: string;
};

function PageLoader({ children }: PageLoaderProps) {
  return (
    <div className="page-loader-container">
      <div className="page-loader-spinner"></div>
      <p>{children}</p>
    </div>
  );
}

export default PageLoader;
