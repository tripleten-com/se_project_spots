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
const modalCloseButton = modal.querySelector(".modal__close-button");
const form = document.forms["profile-form"];
const inputName = form.querySelector("#name");
const inputDesc = form.querySelector("#description");
const profileName = profile.querySelector(".profile__name");
const profileDesc = profile.querySelector(".profile__desc");
const cardsGrid = document.querySelector(".cards");

function toggleModal() {
    modal.classList.toggle("modal_opened");
    if (modal.classList.contains("modal_opened")) {
        inputName.value = profileName.textContent;
        inputDesc.value = profileDesc.textContent;
    }
}

profileEditButton.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;
    toggleModal();
}

form.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(elem) {
    const cardTemplate = document
        .querySelector("#card-template")
        .content.cloneNode(true);

    let cardImage = cardTemplate.querySelector(".card__image");
    let cardDesc = cardTemplate.querySelector(".card__description");

    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    cardDesc.textContent = elem.name;
    return cardTemplate;
}

function renderCards(data) {
    for (let elem of data) {
        const cardElement = getCardElement(elem);
        cardsGrid.append(cardElement);
    }
}

renderCards(initialCards);
