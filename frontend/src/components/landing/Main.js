import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  currentUser,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const contextProfile = React.useContext(CurrentUserContext);
  const { name, about, avatar } = contextProfile;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatars">
            <img
              onClick={onEditAvatar}
              className="profile__avatar"
              src={avatar}
              alt={name}
              name="avatar"
            ></img>
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{name}</h1>
            <button
              type="button"
              className="profile__button-edit"
              onClick={onEditProfile}
            ></button>
            <p className="profile__profession">{about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              key={card._id}
              onCardClick={onCardClick}
              currentUser={currentUser}
              card={card}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
