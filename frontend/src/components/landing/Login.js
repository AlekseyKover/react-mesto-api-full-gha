import React, { useState } from "react";

function Login({ onSignIn }) {
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
      onSignIn(email, password);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="popup-content"
          onSubmit={handleSubmit}
          noValidate
        >
          <section className="login__section">
            <input
              id="input-text"
              type="email"
              placeholder="Email"
              className={`login__input login__input_item-login ${emailError ? "login__input_type_error" : ""}`}
              name="email"
              required
              value={email}
              onChange={handleChangeEmail}
            />
            <span className={`login__input-error ${emailError ? "login__input-error_active" : ""}`}>
              {emailError}
            </span>
          </section>
          <section className="login__section">
            <input
              id="input-password"
              onChange={handleChangePassword}
              value={password}
              type="password"
              placeholder="Пароль"
              className={`login__input login__input_item-password ${passwordError ? "login__input_type_error" : ""}`}
              name="password"
              minLength="2"
              maxLength="30"
              required
            />
            <span className={`login__input-error ${passwordError ? "login__input-error_active" : ""}`}>
              {passwordError}
            </span>
          </section>
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
