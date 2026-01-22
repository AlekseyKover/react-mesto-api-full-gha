import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image ${isOpen ? `popup_opened` : " "}`}>
      <div className="popup__container-images">
        <button
          className="popup__close popup__image-close"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={`${card.link}`} alt={card.name} />
        <p className="popup__text">{card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
