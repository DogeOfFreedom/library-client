import { useRef } from "react";
import PropTypes from "prop-types";

export default function Modal({ setOpen, open, message }) {
  const modal = useRef(null);

  if (open && modal.current !== null) {
    modal.current.showModal();
  }

  const closeModal = () => {
    modal.current.close();
    setOpen(false);
  };

  return (
    <dialog ref={modal}>
      <div>
        <p>{message}</p>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  message: PropTypes.string,
};
