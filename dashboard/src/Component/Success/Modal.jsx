// src/components/Modal.js
import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, farm }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay for animation before setting visibility to false
      setTimeout(() => setIsVisible(false), 300); // Match the duration of the animation
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${isOpen ? "scale-in" : "scale-out"}`}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{farm.name}</h2>
        <img src={`/images/${farm.image}`} alt={farm.name} className="modal-image" />
        <p>Details about {farm.name}</p>
      </div>
    </div>
  );
};

export default Modal;
