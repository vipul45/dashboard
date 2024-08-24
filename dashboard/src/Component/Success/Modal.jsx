// src/components/Modal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, farm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(`/farmhealth/${encodeURIComponent(farm.name)}`); // Encode farm name to handle special characters and spaces
};
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
        <img src={`/image/${farm.image}`} alt={farm.name} className="modal-image" />
        <p>Details about {farm.name}</p>
        <button type="submit" onClick={handleProceed} className="proceed-button">Proceed </button>
      </div>
    </div>
  );
};

export default Modal;
