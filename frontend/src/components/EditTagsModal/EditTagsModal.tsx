import { useState, useEffect } from "react";
import "./EditTagsModal.css";
import Modal from "../Modal/Modal";
import InlineLoader from "../InlineLoader/InlineLoader";

type EditTagsModalProps = {
  isOpen: boolean;
  libraryTags: string[];
  movieTags: string[];
  loadingTags: boolean;
  onClose: () => void;
  onSave: (selectedTags: string[]) => void;
};

function EditTagsModal({
  isOpen,
  libraryTags,
  movieTags,
  loadingTags,
  onClose,
  onSave,
}: EditTagsModalProps) {
  const [editedTags, setEditedTags] = useState<string[]>(movieTags);

  useEffect(() => {
    if (!isOpen) setEditedTags(movieTags);
  }, [isOpen, movieTags]);

  const handleTagChange = (tag: string) => {
    setEditedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  };

  return (
    <Modal isOpen={isOpen}>
      <h2>Edit tags</h2>

      <div className="movie-edit-tags-list">
        {loadingTags ? (
          <div className="loading-tags-container">
            <InlineLoader>Loading tags...</InlineLoader>
          </div>
        ) : (
          <>
            {libraryTags.map((tag: string) => (
              <label key={tag} className="edit-tag">
                <input
                  type="checkbox"
                  value={tag}
                  checked={editedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </>
        )}
      </div>

      <div className="modal-actions edit-tag-modal-actions">
        <button
          type="button"
          className="cancel-button"
          disabled={loadingTags}
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="button"
          className="confirm-button"
          disabled={loadingTags}
          onClick={() => onSave(editedTags)}
        >
          Save changes
        </button>
      </div>
    </Modal>
  );
}

export default EditTagsModal;
