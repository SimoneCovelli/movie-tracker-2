import { useState, useEffect } from "react";
import "./AddToLibraryModal.css";
import Modal from "../Modal/Modal";
import type { MovieStatus } from "../../types/MovieStatus";

type SelectedStatus = MovieStatus | null;

type AddToLibraryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (movieStatus: MovieStatus) => void;
};

function AddToLibraryModal({ isOpen, onClose, onAdd }: AddToLibraryModalProps) {
  const [movieStatus, setMovieStatus] = useState<SelectedStatus>(null);

  useEffect(() => {
    if (!isOpen) setMovieStatus(null);
  }, [isOpen]);

  const handleAdd = () => {
    if (movieStatus === null) return;
    onAdd(movieStatus);
  };

  return (
    <Modal isOpen={isOpen}>
      <h2>Add to my library</h2>
      <p>Choose the status of this movie:</p>

      <div className="status-options">
        <button
          className={movieStatus === "to-watch" ? "selected" : ""}
          onClick={() => setMovieStatus("to-watch")}
        >
          To watch
        </button>

        <button
          className={movieStatus === "watched" ? "selected" : ""}
          onClick={() => setMovieStatus("watched")}
        >
          Watched
        </button>
      </div>

      <div className="modal-actions">
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>

        <button
          className="confirm-button"
          disabled={movieStatus === null}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </Modal>
  );
}

export default AddToLibraryModal;
