import "./DeleteMovieModal.css";
import Modal from "../Modal/Modal";

type DeleteMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

function DeleteMovieModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteMovieModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <h2>Delete movie</h2>
      <p>Are you sure you want to delete this movie from your library?</p>

      <div className="modal-actions delete-movie-modal-actions">
        <button type="button" className="cancel-button" onClick={onClose}>
          Cancel
        </button>

        <button type="button" className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteMovieModal;
