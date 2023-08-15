import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef("");
  function handleChangeAvatar() {
    return ref.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновите Аватар"
      buttonText="Создать"
      nameForm="popup-content"
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_item_avatar"
          name="avatar"
          minLength="2"
          required
          onChange={handleChangeAvatar}
          ref={ref}
        />
        <span className="popup__input-error">Вы пропустиле поле</span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
