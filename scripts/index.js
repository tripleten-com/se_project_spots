import { initialCards, settings } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";

// Modal Variables

/// Edit Profile Modal
const editProfileModal = document.querySelector("#profile-modal");
const editProfileSubmitButton = editProfileModal.querySelector(
    ".modal__submit-button"
);
const editProfileCloseButton = editProfileModal.querySelector(
    ".modal__close-button"
);

/// New Post Modal
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");

/// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(".modal__close-button");
const previewCaption = previewModal.querySelector(".modal__image-caption");
const modalImage = previewModal.querySelector(".modal__image");

// Profile Variables
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileNewPost = profile.querySelector(".profile__new-post");
const profileName = profile.querySelector(".profile__name");
const profileDesc = profile.querySelector(".profile__desc");

// Cards Variables
const cardsGrid = document.querySelector(".cards");

// Form Variables
const editProfileForm = document.forms["edit-profile-form"];
const newPostForm = document.forms["new-post-form"];
const editProfileInputs = editProfileForm.querySelectorAll(".modal__input");
const newPostInputs = newPostForm.querySelectorAll(".modal__input");
const editProfileName = editProfileForm.querySelector("#name");
const editProfileDesc = editProfileForm.querySelector("#description");
const newPostLink = newPostForm.querySelector("#post-link");
const newPostCapt = newPostForm.querySelector("#post-caption");

// Close buttons
const closeButtons = document.querySelectorAll(".modal__close-button");

// ---------------------------------------------------------------------
const validatorProfile = new FormValidator(settings, editProfileForm);
const validatorNewPost = new FormValidator(settings, newPostForm);
// ---------------------------------------------------------------------

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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editProfileName.value;
    profileDesc.textContent = editProfileDesc.value;
    toggleModal(editProfileModal);
    editProfileForm.reset();
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        link: newPostLink.value,
        name: newPostCapt.value,
    };
    const cardElement = getCardElement(newCard);
    cardsGrid.prepend(cardElement);
    validatorNewPost.resetValidation();
    toggleModal(newPostModal);
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

profileEditButton.addEventListener("click", handleOpenModalProfile);
profileNewPost.addEventListener("click", handleOpenModalNewPost);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPostForm.addEventListener("submit", handleCardFormSubmit);

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

// Modal functions end
// ---------------------------------------------------------------------
// Cards functions

function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_liked");
}

function deleteCard(evt) {
    evt.target.closest(".card").remove();
}

function getCardElement(elem) {
    const cardTemplate = document
        .querySelector("#card-template")
        .content.cloneNode(true);

    const cardImage = cardTemplate.querySelector(".card__image");
    const cardDesc = cardTemplate.querySelector(".card__description");
    cardTemplate
        .querySelector(".card__like-button")
        .addEventListener("click", likeCard);
    cardTemplate
        .querySelector(".card__delete-button")
        .addEventListener("click", deleteCard);
    cardImage.addEventListener("click", handlePreviewModal);
    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    cardDesc.textContent = elem.name;
    return cardTemplate;
}

function renderCards(data) {
    data.forEach((elem) => {
        const cardElement = getCardElement(elem);
        cardsGrid.append(cardElement);
    });
}

renderCards(initialCards);
validatorProfile.enableValidation();
validatorNewPost.enableValidation();
// Cards functions end

// ---------------------------------------------------------------------
