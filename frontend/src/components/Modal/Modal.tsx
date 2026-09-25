import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

function Modal({ isOpen, children }: ModalProps) {
  return (
    <section className={isOpen ? "modal" : "modal hidden"}>
      <div className="modal-content">{children}</div>
    </section>
  );
}

export default Modal;
