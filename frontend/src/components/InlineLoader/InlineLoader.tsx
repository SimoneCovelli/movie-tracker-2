import "./InlineLoader.css";

type InlineLoaderProps = {
  children: string;
};

function InlineLoader({ children }: InlineLoaderProps) {
  return (
    <div className="inline-loader-container">
      <div className="inline-loader-spinner"></div>
      <p>{children}</p>
    </div>
  );
}

export default InlineLoader;
