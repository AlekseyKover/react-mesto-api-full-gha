import React, { useRef, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef("");
  const [linkError, setLinkError] = useState("");

  function handleChangeAvatar(e) {
    const value = e.target.value;
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

  function handleSubmit(e) {
    e.preventDefault();
    if (ref.current.value && !linkError) {
      onUpdateAvatar({
        avatar: ref.current.value,
      });
    }
  }

  useEffect(() => {
    ref.current.value = "";
    setLinkError("");
  }, [isOpen]);
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновите Аватар"
      buttonText="Сохранить"
      nameForm="popup-content"
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className={`popup__input popup__input_item_avatar ${linkError ? "popup__input_type_error" : ""}`}
          name="avatar"
          required
          onChange={handleChangeAvatar}
          ref={ref}
        />
        <span className={`popup__input-error ${linkError ? "popup__input-error_active" : ""}`}>
          {linkError || "Введите корректный URL (например: https://example.com/image.jpg)"}
        </span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
