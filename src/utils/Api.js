export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    _request(ext, options) {
        return fetch(`${this._url}/${ext}`, options).then(this._checkResponse);
    }

    _getInitialCards() {
        return this._request(`cards`, {
            headers: this._headers,
        });
    }

    _getUserInfo() {
        return this._request(`users/me`, {
            headers: this._headers,
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
        return this._request(`users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        });
    }

    editAvatar({ avatar }) {
        return this._request(`users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        });
    }

    addNewCard({ name, link }) {
        return this._request(`cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        });
    }

    removeCard({ cardId }) {
        return this._request(`cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    toggleLike({ isLiked, cardId }) {
        return this._request(`cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
        });
    }
}
