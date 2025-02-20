const initialCards = [
    (object1 = {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    }),
    (object2 = {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    }),
    (object3 = {
        name: "An outdoor cafe",
        link: ".https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    }),
    (object4 = {
        name: "A very long bridge, over the forest across the bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    }),
    (object5 = {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    }),
    (object6 = {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    }),
];

let modalBlock = document.querySelector(".modal");
let profileBlock = document.querySelector(".profile");
let profileEditButton = profileBlock.querySelector(".profile__edit-button");
let modalCloseButton = modalBlock.querySelector(".modal__close-button");

modalBlock.classList.remove("modal_opened");

function toggleModal() {
    modalBlock.classList.toggle("modal_opened");
}

profileEditButton.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);
