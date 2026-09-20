import "./ErrorMessage.css";

type ErrorMessageProps = {
  error: string;
};

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <section className="error-message">
      <h1>Something went wrong</h1>
      <p>{error}</p>
    </section>
  );
}

export default ErrorMessage;
