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
const modalContainer = modal.querySelector(".modal__container");
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
const modalSubmitButton = modal.querySelector(".modal__submit-button");
const inputFields = form.querySelectorAll(".modal__input");

// Modal functions

function toggleModal(evt) {
    modal.classList.toggle("modal_opened");
    console.log(evt.currentTarget);
    if (
        evt.target.classList.contains("profile__edit-button") ||
        evt.target.classList.contains("profile__new-post") ||
        evt.currentTarget.classList.contains("modal__close-button")
    ) {
        modalContainer.classList.toggle("modal_opened");
    }
}

function deactivateSubmitbutton() {
    modalSubmitButton.classList.add("modal__submit-button_disabled");
}

function activateSubmitbutton() {
    modalSubmitButton.classList.remove("modal__submit-button_disabled");
}

function handleModalOpen(evt) {
    form.reset();
    toggleModal(evt);

    if (evt.target.classList.contains("profile__edit-button")) {
        editProfileModal();
        activateSubmitbutton();
        form.setAttribute("data-modal-type", "edit-profile");
    } else if (evt.target.classList.contains("profile__new-post")) {
        deactivateSubmitbutton();
        newPostModal();
        form.setAttribute("data-modal-type", "new-post");
    }
}

function editProfileModal() {
    console.log("Profile Edit");
    modalTitle.textContent = "Edit profile";
    modalLabelTitle[0].textContent = "Name";
    modalLabelTitle[1].textContent = "Description";
    firstInput.value = profileName.textContent;
    secondInput.value = profileDesc.textContent;
    firstInput.placeholder = "Type your name";
    secondInput.placeholder = "Describe yourself";
}

function newPostModal() {
    console.log("Post Initiated");
    modalTitle.textContent = "New post";
    modalLabelTitle[0].textContent = "Image link";
    modalLabelTitle[1].textContent = "Caption";
    firstInput.placeholder = "Paste a link to the picture";
    secondInput.placeholder = "Type your caption";
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const modalType = form.getAttribute("data-modal-type");

    // Edit profile
    if (modalType === "edit-profile") {
        console.log("Saving profile changes...");
        profileName.textContent = firstInput.value;
        profileDesc.textContent = secondInput.value;

        // New post
    } else if (modalType === "new-post") {
        console.log("Adding a new post...");
        const newCard = {
            name: secondInput.value,
            link: firstInput.value,
        };
        const cardElement = getCardElement(newCard);
        cardsGrid.prepend(cardElement);
    }

    toggleModal();
    form.removeAttribute("data-modal-type");
}

profileEditButton.addEventListener("click", handleModalOpen);
profileNewPost.addEventListener("click", handleModalOpen);
modalCloseButton.addEventListener("click", toggleModal);
form.addEventListener("submit", handleProfileFormSubmit);

inputFields.forEach((input) => {
    input.addEventListener("input", function () {
        if (firstInput.value.trim() === "" || secondInput.value.trim() === "") {
            deactivateSubmitbutton();
        } else {
            activateSubmitbutton();
        }
    });
});

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
    console.log;
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
