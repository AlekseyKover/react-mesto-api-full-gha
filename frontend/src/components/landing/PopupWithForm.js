import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText,
  nameForm,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? `popup_opened` : " "}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={nameForm}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button popup__button_add" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
