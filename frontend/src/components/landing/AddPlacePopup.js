import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [nameLocation, setNameLocation] = useState("");
  const [nameLinkLocation, setLinkLocation] = useState("");

  function handleChangeName(e) {
    setNameLocation(e.target.value);
  }

  function handleChangeLink(e) {
    setLinkLocation(e.target.value);
  }

  function hanndelSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameLocation,
      link: nameLinkLocation,
    });
  }

  useEffect(() => {
    setNameLocation("");
    setLinkLocation("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add"
      title="Новое место"
      buttonText="Создать"
      nameForm="popup-content"
      onSubmit={hanndelSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          placeholder="Название"
          className="popup__input popup__input_item_text"
          name="namelocation"
          minLength="2"
          onChange={handleChangeName}
          maxLength="30"
          value={nameLocation}
          required
        />
        <span className="popup__input-error">Вы пропустиле поле</span>
      </section>

      <section className="popup__section">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_item_link"
          name="namelink"
          onChange={handleChangeLink}
          value={nameLinkLocation}
          required
        />
        <span className="popup__input-error">Вы пропустиле поле</span>
      </section>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
