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
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

/// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(".modal__close-button");
const cardImage = previewModal.querySelector(".modal__image");

// Profile Variables
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileNewPost = profile.querySelector(".profile__new-post");
const profileName = profile.querySelector(".profile__name");
const profileDesc = profile.querySelector(".profile__desc");

// Cards Variables
const cardsGrid = document.querySelector(".cards");

// Form Variables
const form = document.forms["modal-form"];
const editProfileInputs = editProfileModal.querySelectorAll(".modal__input");
const newPostInputs = newPostModal.querySelectorAll(".modal__input");

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// Modal functions

function toggleModal(modal) {
    modal.classList.toggle("modal_opened");
}

function handleOpenModal(evt) {
    if (evt.target === profileEditButton) {
        editProfileInputs[0].value = profileName.textContent;
        editProfileInputs[1].value = profileDesc.textContent;
        toggleModal(editProfileModal);
        toggleSubmitButton(editProfileInputs, editProfileSubmitButton);
    } else {
        toggleModal(newPostModal);
        toggleSubmitButton(newPostInputs, newPostSubmitButton);
    }
}

function deactivateSubmitbutton(btn) {
    btn.classList.add("modal__submit-button_disabled");
    btn.disabled = true;
}

function activateSubmitbutton(btn) {
    btn.classList.remove("modal__submit-button_disabled");
    btn.disabled = false;
}

function toggleSubmitButton(inputField, submitButton) {
    inputField.forEach((input) => {
        input.addEventListener("input", function () {
            const allFilled = [...inputField].every(
                (field) => field.value.trim() !== ""
            );

            if (allFilled) {
                activateSubmitbutton(submitButton);
            } else {
                deactivateSubmitbutton(submitButton);
            }
        });
    });
}

function handleSubmitForm(evt) {
    evt.preventDefault();
    if (evt.target === editProfileSubmitButton) {
        profileName.textContent = editProfileInputs[0].value;
        profileDesc.textContent = editProfileInputs[1].value;
    } else {
        const newCard = {
            name: newPostInputs[1].value,
            link: newPostInputs[0].value,
        };
        const cardElement = getCardElement(newCard);
        cardsGrid.prepend(cardElement);
    }
    toggleModal(evt.target.closest(".modal"));
}

profileEditButton.addEventListener("click", handleOpenModal);
profileNewPost.addEventListener("click", handleOpenModal);
editProfileCloseButton.addEventListener("click", () =>
    toggleModal(editProfileModal)
);
newPostCloseButton.addEventListener("click", () => toggleModal(newPostModal));
editProfileSubmitButton.addEventListener("click", handleSubmitForm);
newPostSubmitButton.addEventListener("click", handleSubmitForm);

// Modal functions end
// ---------------------------------------------------------------------
// Cards functions

function cardLiked(evt) {
    if (evt.target.classList.contains("card__like-icon_liked")) {
        evt.target.src = "images/like_icon.svg";
        evt.target.classList.remove("card__like-icon_liked");
    } else {
        evt.target.src = "images/liked.svg";
        evt.target.classList.add("card__like-icon_liked");
    }
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
        .querySelector(".card__like-icon")
        .addEventListener("click", cardLiked);
    cardTemplate
        .querySelector(".card__delete-button")
        .addEventListener("click", cardDelete);
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
