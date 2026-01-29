import React, { useEffect, useState } from "react";
import Header from "./landing/Header";
import Main from "./landing/Main";
import Footer from "./landing/Footer";
import Login from "./landing/Login";
import api from "../../src/utils/Api";
import auth from "../utils/auth";
import PopupWithForm from "./landing/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ImagePopup from "./landing/ImagePopup";
import EditProfilePopup from "./landing/EditProfilePopup";
import EditAvatarPopup from "./landing/EditAvatarPopup";
import AddPlacePopup from "./landing/AddPlacePopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./landing/Register";
import ProtectedRoute from "./landing/ProtectedRoute";
import InfoTooltip from "./landing/InfoTooltip";
import oks from "../images/Oks.svg";
import fail from "../images/Fail.svg";
function App() {
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [infoTooltiptext, setInfoTooltiptext] = useState("");
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const navigate = useNavigate();

  function handelLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        setEmail(email);
        setLoggedIn(true);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
        }

        navigate("/", { replace: true });
      })
      .catch((err) => {
        let message = err.message || "Что-то пошло не так! Попробуйте ещё раз.";

        if (
          message === "Ошибка: 401" ||
          message === "Ошибка: 403" ||
          message === "Неверные данные"
        ) {
          message = "Неверный логин или пароль";
        }

        setInfoTooltiptext(message);
        setIsSuccess(false);
        setInfoTooltipPopupOpen(true);
        // eslint-disable-next-line no-console
        console.error("Ошибка авторизации:", err);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res && res.data) {
          setInfoTooltiptext("Вы успешно зарегистрировались!");
          setIsSuccess(true);
          setInfoTooltipPopupOpen(true);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        setInfoTooltiptext(
          err.message || "Что-то пошло не так! Попробуйте ещё раз."
        );
        setIsSuccess(false);
        setInfoTooltipPopupOpen(true);
        // eslint-disable-next-line no-console
        console.error("Ошибка регистрации:", err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }

  function handleSingOut() {
    localStorage.removeItem("jwt");
    setEmail(""); 
    setLoggedIn(false); 
    navigate("/signin", { replace: true });
  }

  function handleCardLike(card) {
    if (!currentUser || !currentUser._id) {
      console.error('Текущий пользователь не определен');
      return;
    }
    
    const isLiked = card.likes && card.likes.some((i) => {
      const likeId = typeof i === 'object' ? i._id : i;
      return likeId === currentUser._id;
    });

    if (!isLiked) {
      api
        .like(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => {
              if (c._id === card._id) {
                return {
                  ...newCard,
                  _id: newCard._id,
                  name: newCard.name,
                  link: newCard.link,
                  likes: newCard.likes || [],
                  owner: newCard.owner,
                };
              }
              return c;
            })
          );
        })
        .catch((err) => {
          console.error('Ошибка при установке лайка:', err);
        });
    } else {
      api
        .dislike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => {
              if (c._id === card._id) {
                return {
                  ...newCard,
                  _id: newCard._id,
                  name: newCard.name,
                  link: newCard.link,
                  likes: newCard.likes || [],
                  owner: newCard.owner,
                };
              }
              return c;
            })
          );
        })
        .catch((err) => {
          console.error('Ошибка при снятии лайка:', err);
        });
    }
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handelUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .setUserIfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleInfoTooltip() {
    setInfoTooltipPopupOpen(true);
  }
  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setIsCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([data, cardData]) => {
          setCurrentUser(data);
          setCards(
            cardData.map((card) => ({
              _id: card._id,
              name: card.name,
              link: card.link,
              likes: card.likes,
              owner: card.owner,
            }))
          );
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    component={Header}
                    Links="/signin"
                    title="Выйти"
                    email={email}
                    exit={handleSingOut}
                    ProtectedRoute
                  />
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    component={Main}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    cards={cards}
                    currentUser={currentUser}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                  />
                </>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <>
                  <Header Links={"/signin"} title="Войти" />
                  <Register onRegister={handleRegister} />
                </>
              }
            />

            <Route
              path="/signin"
              element={
                <>
                  <Header Links={"/signup"} title="Регестрация" />
                  <Login onSignIn={handelLogin} />
                </>
              }
            />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            setCurrentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handelUpdateAvatar}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
            nameForm="popup-delete"
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            title={infoTooltiptext}
            onClose={closeAllPopups}
            image={isSuccess ? oks : fail}
          />
          <ImagePopup
            isOpen={isCardPopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
