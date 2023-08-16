class Auth {
  constructor(options) {
    this._baseUrl = options;

    this._getJSON = function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  register(password,email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json"
      },
       body: JSON.stringify({ password, email}),
    }).then((res) => this._getJSON({res}));
  }

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => this._getJSON(res));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this._getJSON(res))
      .then((response) => response);
  }
}

const auth = new Auth('https://api.alekskover.nomoreparties.co');

export default auth;
