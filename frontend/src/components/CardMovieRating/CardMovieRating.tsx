import "./CardMovieRating.css";

type CardMovieRatingProps = {
  status: string;
  rating: number | null;
};

function CardMovieRating({ status, rating }: CardMovieRatingProps) {
  if (status === "to-watch") {
    return <span className="rating">Rating unavailable</span>;
  }

  if (rating === null) {
    return <span className="rating">Not rated</span>;
  }

  return (
    <span className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "active" : ""}>
          ★
        </span>
      ))}
    </span>
  );
}

export default CardMovieRating;
