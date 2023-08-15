import React from "react";

function InfoTooltip({ isOpen, title, onClose, image }) {
  return (
    <div className={`popup popup_check ${isOpen ? "popup_opened" : " "}`}>
      <div className="popup__container">
        <img className="popup__image-check" src={image} />
        <h2 className="popup__title-check">{title}</h2>
        <button
          className="popup__close"
          type="button"
          name="close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
