import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
function Register({ onRegister }) {
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
    console.log("pass" + " " + password);
    console.log("ema" + " " + email);
    onRegister(password, email);
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Регестрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <section className="login__section">
            <input
              type="email"
              placeholder="Email"
              className="login__input login__input_item-login"
              value={email}
              onChange={handleChangeEmail}
            />
          </section>
          <section className="login__section">
            <input
              type="password"
              placeholder="Пароль"
              className="login__input login__input_item-password"
              name="namelocation"
              minLength="2"
              maxLength="30"
              required
              value={password}
              onChange={handleChangePassword}
              noValidate
            />
          </section>
          <button className="login__button" type="submit">
            Зарегестрироваться
          </button>
          <Link  to={"/signin"} className="login__subbtitle">
          Уже Зарегестрированы? Войти
        </Link>
        </form>
      </div>
    </div>
  );
}
export default Register;
