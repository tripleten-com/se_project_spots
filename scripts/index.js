const initialCards = [
    {
        name: "Golden gate bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
        name: "Val Thorens",
        link: "images/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
        name: "Restaurant terrace",
        link: "images/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
        name: "An outdoor cafe",
        link: "images/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
        name: "A very long bridge, over the forest across the bridge",
        link: "images/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
        name: "Tunnel with morning light",
        link: "images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
        name: "Mountain house",
        link: "images/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
];

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
const editProfileForm = editProfileModal.querySelector(".modal__form");
const newPostForm = newPostModal.querySelector(".modal__form");
const editProfileInputs = editProfileForm.querySelectorAll(".modal__input");
const newPostInputs = newPostForm.querySelectorAll(".modal__input");
const editProfileName = editProfileForm.querySelector("#name");
const editProfileDesc = editProfileForm.querySelector("#description");
const newPostLink = newPostForm.querySelector("#post-link");
const newPostCapt = newPostForm.querySelector("#post-caption");

// Close buttons
const closeButtons = document.querySelectorAll(".modal__close-button");

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// Modal functions

function toggleModal(modal) {
    modal.classList.toggle("modal_opened");
}

function handleOpenModalProfile() {
    enableEscapeClose();
    const errorText = editProfileForm.querySelectorAll(".modal__error-text");
    editProfileName.value = profileName.textContent;
    editProfileDesc.value = profileDesc.textContent;
    toggleModal(editProfileModal);
    toggleSubmitButton(editProfileInputs, editProfileSubmitButton);
    editProfileInputs.forEach((input) => {
        input.classList.remove("modal__input_error");
    });
    errorText.forEach((text) => {
        text.classList.remove("modal__error-text_active");
    });
}

function handleOpenModalNewPost() {
    enableEscapeClose();
    toggleModal(newPostModal);
    toggleSubmitButton(newPostInputs, newPostSubmitButton);
}

function deactivateSubmitbutton(btn) {
    btn.classList.add("modal__submit-button_disabled");
    btn.disabled = true;
}

function activateSubmitbutton(btn) {
    btn.classList.remove("modal__submit-button_disabled");
    btn.disabled = false;
}

function toggleSubmitButton(inputFields, submitButton) {
    inputFields.forEach((input) => {
        input.addEventListener("input", function () {
            const isValid = [...inputFields].every(
                (input) => input.validity.valid
            );
            if (isValid) {
                activateSubmitbutton(submitButton);
            } else {
                deactivateSubmitbutton(submitButton);
            }
        });
    });
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
    newPostForm.reset();
    toggleModal(newPostModal);
    deactivateSubmitbutton(newPostSubmitButton);
}

function handlePreviewModal(evt) {
    enableEscapeClose();
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
                disableEscapeClose();
            }
        });
    });
};

const escapeKeyFunction = (evt) => {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".modal_opened");
        toggleModal(openedModal);
        disableEscapeClose();
    }
};

const enableEscapeClose = () => {
    document.addEventListener("keydown", escapeKeyFunction);
};

const disableEscapeClose = () => {
    document.removeEventListener("keydown", escapeKeyFunction);
};

closeModalOnOverlay();

// Modal functions end
// ---------------------------------------------------------------------
// Cards functions

function cardLiked(evt) {
    evt.target.classList.toggle("card__like-button_liked");
}

function cardDelete(evt) {
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
        .addEventListener("click", cardLiked);
    cardTemplate
        .querySelector(".card__delete-button")
        .addEventListener("click", cardDelete);
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

// Cards functions end

// ---------------------------------------------------------------------
