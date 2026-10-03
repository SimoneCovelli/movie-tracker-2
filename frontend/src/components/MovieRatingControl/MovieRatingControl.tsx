import { useState } from "react";
import "./MovieRatingControl.css";
import type { MovieStatus } from "../../types/MovieStatus";

type MovieRatingControlProps = {
  movieStatus: MovieStatus;
  value: number | null;
  onValueChange: (rating: number | null) => void;
};

function MovieRatingControl({
  movieStatus,
  value,
  onValueChange,
}: MovieRatingControlProps) {
  const [clickedStar, setClickedStar] = useState<number | null>(null);
  const [previewRating, setPreviewRating] = useState<number | null>(null);

  const displayedRating = previewRating ?? value;

  const getRatingButtonClassName = (starNumber: number) => {
    const isActive = displayedRating !== null && starNumber <= displayedRating;
    const isClicked = clickedStar === starNumber;

    let className = "rating-star";
    if (isActive) className += " active";
    if (isClicked) className += " clicked";

    return className;
  };

  const handleRatingButtonClick = (starNumber: number) => {
    setPreviewRating(null);

    setClickedStar(null);
    requestAnimationFrame(() => setClickedStar(starNumber));

    onValueChange(starNumber === value ? null : starNumber);
  };

  return (
    <div className="movie-rating-control">
      {movieStatus === "to-watch" ? (
        <span className="movie-rating-unavailable">Rating unavailable</span>
      ) : (
        <div
          className="movie-rating-stars"
          onMouseLeave={() => setPreviewRating(null)}
        >
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <button
              key={starNumber}
              type="button"
              className={getRatingButtonClassName(starNumber)}
              onMouseEnter={() => setPreviewRating(starNumber)}
              onClick={() => handleRatingButtonClick(starNumber)}
            >
              ★
            </button>
          ))}

          <span className="movie-rating-value">
            {value !== null ? `Your rating: ${value}/5` : "Not rated"}
          </span>
        </div>
      )}
    </div>
  );
}

export default MovieRatingControl;
