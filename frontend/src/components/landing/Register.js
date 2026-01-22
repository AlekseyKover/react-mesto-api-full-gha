import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    if (evt.target.validity.valid) {
      setEmailError("");
    } else {
      setEmailError("Введите корректный email адрес");
    }
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    if (evt.target.validity.valid) {
      setPasswordError("");
    } else {
      if (evt.target.validity.tooShort) {
        setPasswordError("Пароль должен быть не менее 2 символов");
      } else if (evt.target.validity.tooLong) {
        setPasswordError("Пароль должен быть не более 30 символов");
      } else {
        setPasswordError("Пароль обязателен для заполнения");
      }
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (email && password && !emailError && !passwordError) {
      onRegister(email, password);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <section className="login__section">
            <input
              type="email"
              placeholder="Email"
              className={`login__input login__input_item-login ${emailError ? "login__input_type_error" : ""}`}
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <span className={`login__input-error ${emailError ? "login__input-error_active" : ""}`}>
              {emailError}
            </span>
          </section>
          <section className="login__section">
            <input
              type="password"
              placeholder="Пароль"
              className={`login__input login__input_item-password ${passwordError ? "login__input_type_error" : ""}`}
              name="password"
              minLength="2"
              maxLength="30"
              required
              value={password}
              onChange={handleChangePassword}
            />
            <span className={`login__input-error ${passwordError ? "login__input-error_active" : ""}`}>
              {passwordError}
            </span>
          </section>
          <button className="login__button" type="submit">
            Зарегистрироваться
          </button>
          <Link to={"/signin"} className="login__subbtitle">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Register;
