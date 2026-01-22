import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      nameForm="popup-content"
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          id="input-text"
          className="popup__input popup__input_item_name input-text"
          name="username"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error"> Вы пропустиле поле</span>
      </section>
      <section className="popup__section">
        <input
          type="text"
          name="userjob"
          className="popup__input popup__input_item_profession"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description || ""}
        />
        <span className="popup__input-error"> Вы пропустиле поле</span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
