import React from "react";
import logo from "../../images/logo.svg";
import { Link, Route } from "react-router-dom";
function Header({exit, title, Links, email }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Лого" src={logo}></img>
      <button className="header__button">
        <p className="header__email">{email}</p>
        <Link onClick={exit} to={Links} className="header__status">
          {title}
        </Link>
      </button>
    </header>
  );
}

export default Header;
