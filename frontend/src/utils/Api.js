class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      ...this._headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._getHeaders(),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  setUserIfo(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  like(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }

  dislike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
      credentials: 'include',
    }).then((res) => this._checkRes(res));
  }
}

const api = new Api({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: {
        'content-type': 'application/json'
    }
});

export default api;
