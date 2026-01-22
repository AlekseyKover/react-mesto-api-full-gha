class Auth {
  constructor(options) {
    this._baseUrl = options;

    this._getJSON = function (res) {
      if (res.ok) {
        return res.json();
      }
      return res.json()
        .then((err) => {
          return Promise.reject(new Error(err.message || `Ошибка: ${res.status}`));
        })
        .catch(() => {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    };
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then((res) => this._getJSON(res))
      .catch((err) => {
        if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
          return Promise.reject(new Error('Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен на порту 3001.'));
        }
        return Promise.reject(err);
      });
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then((res) => this._getJSON(res))
      .catch((err) => {
        if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
          return Promise.reject(new Error('Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен на порту 3001.'));
        }
        return Promise.reject(err);
      });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => this._getJSON(res))
      .then((response) => ({ data: response }));
  }
}

const auth = new Auth(process.env.REACT_APP_API_URL || 'http://localhost:3001');

export default auth;
