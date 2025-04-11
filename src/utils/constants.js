const initialCards = [
    {
        name: "Golden gate bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
        name: "Val Thorens",
        link: "https://github.com/reondaze-a/se_project_spots/blob/main/images/1-photo-by-moritz-feldmann-from-pexels.jpg?raw=true",
    },
    {
        name: "Restaurant terrace",
        link: "https://github.com/reondaze-a/se_project_spots/blob/main/images/2-photo-by-ceiline-from-pexels.jpg?raw=true",
    },
    {
        name: "An outdoor cafe",
        link: "https://github.com/reondaze-a/se_project_spots/blob/main/images/3-photo-by-tubanur-dogan-from-pexels.jpg?raw=true",
    },
    {
        name: "A very long bridge, over the forest across the bridge",
        link: "https://github.com/reondaze-a/se_project_spots/blob/main/images/4-photo-by-maurice-laschet-from-pexels.jpg?raw=true>",
    },
    {
        name: "Tunnel with morning light",
        link: "https://github.com/reondaze-a/se_project_spots/blob/main/images/5-photo-by-van-anh-nguyen-from-pexels.jpg?raw=true",
    },
    {
        name: "Mountain house",
        link: "https://github.com/reondaze-a/se_project_spots/blob/main/images/6-photo-by-moritz-feldmann-from-pexels.jpg?raw=true",
    },
];

const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-button",
    inactiveButtonClass: "modal__submit-button_disabled",
    inputErrorClass: "modal__input_error",
    errorClass: "modal__error-text_active",
};

export { initialCards, settings };
