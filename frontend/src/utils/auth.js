/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
class Auth {
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

  signUp(signUpData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: signUpData.email,
        password: signUpData.password,
      }),
    })
      .then(this._getResponseData);
  }

  signIn(signInData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: signInData.email,
        password: signInData.password,
      }),
    })
      .then(this._getResponseData);
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${jwt}`,
      },
      credentials: 'include',
    })
      .then(this._getResponseData);
  }
}

export default new Auth({
  baseUrl: 'https://api.kuzinartemiy.students.nomoredomains.monster',
});
