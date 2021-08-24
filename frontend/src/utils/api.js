/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._getResponseData);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._getResponseData);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(this._getResponseData);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._getResponseData);
  }
}

export default new Api({
  baseUrl: 'https://api.kuzinartemiy.students.nomoredomains.monster',
  // token: 'dff2004b-ae2b-4b49-ae11-6674a4b5c7dc'
});
