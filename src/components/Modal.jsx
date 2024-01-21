import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const Modal = ({ title, children, open, onOpen }) => {
  if (!open) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon name" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
