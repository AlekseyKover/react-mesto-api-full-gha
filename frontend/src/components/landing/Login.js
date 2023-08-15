import React, { useState } from "react";

function Login({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignIn(email, password);
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="popup-content"
          onSubmit={handleSubmit}
        >
          <section className="login__section">
            <input
              id="input-text"
              type="email"
              placeholder="Email"
              className="login__input login__input_item-login"
              name="namelocation"
              minLength="2"
              maxLength="30"
              noValidate
              value={email}
              onChange={handleChangeEmail}
            />
          </section>
          <section className="login__section">
            <input
              id="input-text"
              onChange={handleChangePassword}
              value={password}
              type="password"
              placeholder="Пароль"
              className="login__input login__input_item-password"
              name="namelocation"
              minLength="2"
              maxLength="30"
              noValidate
            />
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
