export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    _getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    loadInitialContent() {
        return Promise.all([this._getInitialCards(), this._getUserInfo()]).then(
            ([cards, userData]) => {
                return { cards, userData };
            }
        );
    }

    editUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    editAvatar({ avatar }) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }
}
