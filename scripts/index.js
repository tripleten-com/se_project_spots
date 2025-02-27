const initialCards = [
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

const modal = document.querySelector("#edit-modal");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileNewPost = profile.querySelector(".profile__new-post");
const modalCloseButton = modal.querySelector(".modal__close-button");
const form = document.forms["modal-form"];
const firstInput = form.querySelector("#firstInput");
const secondInput = form.querySelector("#secondInput");
const profileName = profile.querySelector(".profile__name");
const profileDesc = profile.querySelector(".profile__desc");
const cardsGrid = document.querySelector(".cards");
const modalTitle = modal.querySelector(".modal__title");
const modalLabelTitle = modal.querySelectorAll(".modal__label-title");

// Modal functions

function toggleModal(evt) {
    modal.classList.toggle("modal_opened");
    if (evt.target.classList.contains("profile__edit-button")) {
        form.reset();
        editProfileModal();
    } else if (evt.target.classList.contains("profile__new-post")) {
        form.reset();
        newPostModal();
    } else if (evt.target.classList.contains("modal__close-button")) {
        form.reset();
    }
}

function editProfileModal() {
    console.log("hey");
    modalTitle.textContent = "Edit profile";
    modalLabelTitle[0].textContent = "Name";
    modalLabelTitle[1].textContent = "Description";
    firstInput.value = profileName.textContent;
    secondInput.value = profileDesc.textContent;
}

function newPostModal() {
    console.log("hey");
    modalTitle.textContent = "New post";
    modalLabelTitle[0].textContent = "Image link";
    modalLabelTitle[1].textContent = "Caption";
}

profileEditButton.addEventListener("click", toggleModal);
profileNewPost.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    toggleModal();
}

form.addEventListener("submit", handleProfileFormSubmit);

// Modal functions end
// ---------------------------------------------------------------------
// Render cards functions

function getCardElement(elem) {
    const cardTemplate = document
        .querySelector("#card-template")
        .content.cloneNode(true);

    const cardImage = cardTemplate.querySelector(".card__image");
    const cardDesc = cardTemplate.querySelector(".card__description");

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

// Render cards end
