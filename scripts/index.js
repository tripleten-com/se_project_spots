const initialCards = [
    (object1 = {
        name: "Val Thorens",
        link: "images/1-photo-by-moritz-feldmann-from-pexels.jpg",
    }),
    (object2 = {
        name: "Restaurant terrace",
        link: "images/2-photo-by-ceiline-from-pexels.jpg",
    }),
    (object3 = {
        name: "An outdoor cafe",
        link: "images/3-photo-by-tubanur-dogan-from-pexels.jpg",
    }),
    (object4 = {
        name: "A very long bridge, over the forest across the bridge",
        link: "images/4-photo-by-maurice-laschet-from-pexels.jpg",
    }),
    (object5 = {
        name: "Tunnel with morning light",
        link: "images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    }),
    (object6 = {
        name: "Mountain house",
        link: "images/6-photo-by-moritz-feldmann-from-pexels.jpg",
    }),
];

const modal = document.querySelector("#edit-modal");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const modalCloseButton = modal.querySelector(".modal__close-button");

modal.classList.remove("modal_opened");

function toggleModal() {
    modal.classList.toggle("modal_opened");
}

profileEditButton.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);

const form = modal.querySelector(".modal__form");
let inputName = form.querySelector("#name");
let inputDesc = form.querySelector("#description");
const profileName = profile.querySelector(".profile__name");
const profileDesc = profile.querySelector(".profile__desc");

inputName.value = profileName.textContent;
inputDesc.value = profileDesc.textContent;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;
    // profile.offsetHeight;
    modal.classList.toggle("modal_opened");
}

form.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
    const cardsGrid = document.querySelector(".cards");

    for (let elem of data) {
        const cardTemplate = document
            .querySelector("#card-template")
            .content.cloneNode(true);

        let cardImage = cardTemplate.querySelector(".card__image");
        let cardDesc = cardTemplate.querySelector(".card__description");

        cardImage.src = elem.link;
        cardImage.alt = elem.name;
        cardDesc.textContent = elem.name;
        cardsGrid.append(cardTemplate);
    }
}

getCardElement(initialCards);
