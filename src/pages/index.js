import { settings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Api from "../utils/Api.js";

// Modal Variables

/// Edit Profile Modal
const editProfileModal = document.querySelector("#profile-modal");
const editProfileSubmitButton = editProfileModal.querySelector(
    ".modal__submit-button"
);

/// New Post Modal
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");

/// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewCaption = previewModal.querySelector(".modal__image-caption");
const modalImage = previewModal.querySelector(".modal__image");

/// Delete Post Modal
const deletePostModal = document.querySelector("#delete-post-modal");
const deletePostSubmitButton = deletePostModal.querySelector(
    ".modal__submit-button"
);
const deletePostCancelButton = deletePostModal.querySelector(
    ".modal__submit-button_cancel"
);

// Avatar Modal
const avatarModal = document.querySelector("#avatar-modal");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-button");

// Profile Variables
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector("#edit-profile");
const profileNewPost = profile.querySelector(".profile__new-post");
const profileName = profile.querySelector(".profile__name");
const profileDesc = profile.querySelector(".profile__desc");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileAvatarOverlay = profile.querySelector(".profile__avatar-overlay");

// Cards Variables
const cardsGrid = document.querySelector(".cards");

// Form Variables
const editProfileForm = document.forms["edit-profile-form"];
const newPostForm = document.forms["new-post-form"];
const avatarForm = document.forms["avatar-form"];
//--------------------------------------------------------
const editProfileName = editProfileForm.querySelector("#name");
const editProfileDesc = editProfileForm.querySelector("#description");
//--------------------------------------------------------
const newPostLink = newPostForm.querySelector("#post-link");
const newPostCapt = newPostForm.querySelector("#post-caption");
//--------------------------------------------------------
const avatarLink = avatarForm.querySelector("#avatar-link");
const deletePostForm = document.forms["delete-post-form"];

// Close buttons
const closeButtons = document.querySelectorAll(".modal__close-button");

// ---------------------------------------------------------------------

const validatorProfile = new FormValidator(settings, editProfileForm);
const validatorNewPost = new FormValidator(settings, newPostForm);
const validatorAvatar = new FormValidator(settings, avatarForm);
// ---------------------------------------------------------------------

// API
const api = new Api({
    url: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "13430c32-a8ca-4f0e-9fc3-4da36101b73c",
        "Content-Type": "application/json",
    },
});

// Modal functions

function toggleModal(modal) {
    modal.classList.toggle("modal_opened");
    if (modal.classList.contains("modal_opened")) {
        enableEscapeClose();
    } else {
        disableEscapeClose();
    }
}

function handleOpenModalProfile() {
    editProfileName.value = profileName.textContent;
    editProfileDesc.value = profileDesc.textContent;
    editProfileName.dispatchEvent(new Event("input"));
    editProfileDesc.dispatchEvent(new Event("input"));
    toggleModal(editProfileModal);
}

function handleOpenModalNewPost() {
    toggleModal(newPostModal);
}

function handleOpenModalAvatar() {
    toggleModal(avatarModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    loading(true, editProfileSubmitButton);

    api.editUserInfo({
        name: editProfileName.value,
        about: editProfileDesc.value,
    })
        .then((res) => {
            profileName.textContent = res.name;
            profileDesc.textContent = res.about;
            toggleModal(editProfileModal);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            loading(false, editProfileSubmitButton);
        });
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    loading(true, avatarSubmitButton);
    api.editAvatar({ avatar: avatarLink.value })
        .then((res) => {
            profileAvatar.src = res.avatar;
            profileAvatar.alt = res.name;
            avatarForm.reset();
            validatorAvatar.resetValidation();
            toggleModal(avatarModal);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            loading(false, avatarSubmitButton);
        });
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    loading(true, newPostSubmitButton);
    const newCard = {
        link: newPostLink.value,
        name: newPostCapt.value,
    };
    api.addNewCard(newCard)
        .then((res) => {
            const cardElement = getCardElement(res);
            cardsGrid.prepend(cardElement);
            validatorNewPost.resetValidation();
            toggleModal(newPostModal);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            loading(false, newPostSubmitButton);
        });
}

function handlePreviewModal(evt) {
    modalImage.src = evt.target.src;
    modalImage.alt = evt.target.alt;
    previewCaption.textContent = evt.target.alt;
    toggleModal(previewModal);
}

closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => toggleModal(modal));
});

deletePostCancelButton.addEventListener("click", () => {
    toggleModal(deletePostModal);
});

profileEditButton.addEventListener("click", handleOpenModalProfile);
profileNewPost.addEventListener("click", handleOpenModalNewPost);
profileAvatarOverlay.addEventListener("click", handleOpenModalAvatar);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

const closeModalOnOverlay = () => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        modal.addEventListener("click", (evt) => {
            if (evt.target === modal) {
                toggleModal(modal);
            }
        });
    });
};

const closeKeyEscape = (evt) => {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".modal_opened");
        toggleModal(openedModal);
    }
};

const enableEscapeClose = () => {
    document.addEventListener("keydown", closeKeyEscape);
};

const disableEscapeClose = () => {
    document.removeEventListener("keydown", closeKeyEscape);
};

closeModalOnOverlay();

// Loading functions

function loading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Saving...";
    } else {
        button.textContent = "Save";
    }
}

function loadingDelete(isLoading, button) {
    if (isLoading) {
        button.textContent = "Deleting...";
    } else {
        button.textContent = "Delete";
    }
}

// Modal functions end
// ---------------------------------------------------------------------
// Cards functions

function likeCard(evt) {
    api.toggleLike({
        isLiked: evt.target.classList.contains("card__like-button_liked"),
        cardId: evt.target.closest(".card").id,
    })
        .then(() => {
            evt.target.classList.toggle("card__like-button_liked");
        })
        .catch((err) => {
            console.error(err);
        });
}

deletePostForm.addEventListener("submit", handledeletePost);

let selectedCard;

function deletePost(evt) {
    selectedCard = evt.target.closest(".card");
    toggleModal(deletePostModal);
}

function handledeletePost(evt) {
    evt.preventDefault();
    loadingDelete(true, deletePostSubmitButton);
    api.removeCard({ cardId: selectedCard.id })
        .then(() => {
            selectedCard.remove();
            toggleModal(deletePostModal);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            loadingDelete(false, deletePostSubmitButton);
        });
}

function getCardElement(elem) {
    const cardTemplate = document
        .querySelector("#card-template")
        .content.cloneNode(true);

    const cardImage = cardTemplate.querySelector(".card__image");
    const cardDesc = cardTemplate.querySelector(".card__description");
    const likeButton = cardTemplate.querySelector(".card__like-button");
    likeButton.addEventListener("click", likeCard);
    if (elem.isLiked) {
        likeButton.classList.add("card__like-button_liked");
    }

    cardTemplate
        .querySelector(".card__delete-button")
        .addEventListener("click", deletePost);
    cardImage.addEventListener("click", handlePreviewModal);
    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    cardImage.closest(".card").id = elem._id;
    cardDesc.textContent = elem.name;
    return cardTemplate;
}

function renderCards(data) {
    data.forEach((elem) => {
        const cardElement = getCardElement(elem);
        cardsGrid.append(cardElement);
    });
}

api.loadInitialContent()
    .then(({ cards, userData }) => {
        renderCards(cards);
        profileName.textContent = userData.name;
        profileDesc.textContent = userData.about;
        profileAvatar.src = userData.avatar;
    })
    .catch((err) => {
        console.error(err);
    });

// Cards functions end

// Validators

validatorProfile.enableValidation();
validatorNewPost.enableValidation();
validatorAvatar.enableValidation();

// ---------------------------------------------------------------------
