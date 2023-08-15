import React from "react";
import trash from "../../images/Vector-trach.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, currentUser, onCardLike, onCardDelete }) {
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked ? "element__button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handelDeleteCard() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      {isOwn && (
        <img
          className="element__delete"
          onClick={handelDeleteCard}
          src={trash}
          alt="удалить"
        />
      )}
      <img
        className="element__photo"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="element__footer">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>

          <p className="element__likes-number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
