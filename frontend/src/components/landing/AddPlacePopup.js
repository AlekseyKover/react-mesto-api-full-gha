import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [nameLocation, setNameLocation] = useState("");
  const [nameLinkLocation, setLinkLocation] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  function handleChangeName(e) {
    setNameLocation(e.target.value);
    if (e.target.validity.valid) {
      setNameError("");
    } else {
      if (e.target.validity.tooShort) {
        setNameError("Название должно быть не менее 2 символов");
      } else if (e.target.validity.tooLong) {
        setNameError("Название должно быть не более 30 символов");
      } else {
        setNameError("Название обязательно для заполнения");
      }
    }
  }

  function handleChangeLink(e) {
    setLinkLocation(e.target.value);
    if (e.target.validity.valid) {
      setLinkError("");
    } else {
      if (e.target.validity.typeMismatch) {
        setLinkError("Введите корректный URL (например: https://example.com/image.jpg)");
      } else {
        setLinkError("Ссылка на картинку обязательна для заполнения");
      }
    }
  }

  function hanndelSubmit(e) {
    e.preventDefault();
    if (nameLocation && nameLinkLocation && !nameError && !linkError) {
      onAddPlace({
        name: nameLocation,
        link: nameLinkLocation,
      });
    }
  }

  useEffect(() => {
    setNameLocation("");
    setLinkLocation("");
    setNameError("");
    setLinkError("");
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
          className={`popup__input popup__input_item_text ${nameError ? "popup__input_type_error" : ""}`}
          name="namelocation"
          minLength="2"
          onChange={handleChangeName}
          maxLength="30"
          value={nameLocation}
          required
        />
        <span className={`popup__input-error ${nameError ? "popup__input-error_active" : ""}`}>
          {nameError || "Вы пропустили поле"}
        </span>
      </section>

      <section className="popup__section">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className={`popup__input popup__input_item_link ${linkError ? "popup__input_type_error" : ""}`}
          name="namelink"
          onChange={handleChangeLink}
          value={nameLinkLocation}
          required
        />
        <span className={`popup__input-error ${linkError ? "popup__input-error_active" : ""}`}>
          {linkError || "Введите корректный URL (например: https://example.com/image.jpg)"}
        </span>
      </section>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
