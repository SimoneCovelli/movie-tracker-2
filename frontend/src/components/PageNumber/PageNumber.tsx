import "./PageNumber.css";

type PageNumberProps = {
  totalPages: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
};

function PageNumber({ totalPages, pageNumber, onPageChange }: PageNumberProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const minPage = Number(event.target.min);
    const value = Number(event.target.value);
    const limitedValue = Math.max(minPage, Math.min(value, totalPages));
    onPageChange(limitedValue);
  };

  return (
    <div className="page-number-container">
      <span className="page-label">Page</span>
      <input
        className="page-number"
        type="number"
        min="1"
        max={totalPages}
        step="1"
        value={pageNumber}
        onChange={handleChange}
      />
    </div>
  );
}

export default PageNumber;
