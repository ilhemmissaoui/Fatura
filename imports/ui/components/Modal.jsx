import React from "react";

const Modal = () => {
  return (
    <div
      className="modal modal-blur fade show"
      id="modal-simple"
      tabIndex={-1}
      role="dialog"
      style={{ paddingRight: 12, display: "block" }}
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            animi beatae delectus deleniti dolorem eveniet facere fuga iste nemo
            nesciunt nihil odio perspiciatis, quia quis reprehenderit sit
            tempora totam unde.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn me-auto"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
