import "./CardMovieTags.css";

type CardMovieTagsProps = {
  tags: string[];
};

function CardMovieTags({ tags }: CardMovieTagsProps) {
  return (
    <div className="movie-tags">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default CardMovieTags;
