import "./MovieTagsSection.css";

type MovieTagsSectionProps = {
  tags: string[];
  onEditTags: () => void;
};

function MovieTagsSection({ tags, onEditTags }: MovieTagsSectionProps) {
  return (
    <div className="movie-tags-section">
      <div className="movie-tags-container">
        {tags.length === 0 ? (
          <span className="no-tags">No tags assigned</span>
        ) : (
          tags.map((tag) => (
            <span key={tag} className="movie-tag">
              {tag}
            </span>
          ))
        )}
      </div>

      <button type="button" className="edit-tags-button" onClick={onEditTags}>
        Edit tags
      </button>
    </div>
  );
}

export default MovieTagsSection;
