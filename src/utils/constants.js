const initialCards = [
    {
        name: "Golden gate bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
        name: "Val Thorens",
        link: "<%=require('./images/1-photo-by-moritz-feldmann-from-pexels.jpg')%>",
    },
    {
        name: "Restaurant terrace",
        link: "<%=require('./images/2-photo-by-ceiline-from-pexels.jpg')%>",
    },
    {
        name: "An outdoor cafe",
        link: "<%=require('./images/3-photo-by-tubanur-dogan-from-pexels.jpg')%>",
    },
    {
        name: "A very long bridge, over the forest across the bridge",
        link: "<%=require('./images/4-photo-by-maurice-laschet-from-pexels.jpg')%>",
    },
    {
        name: "Tunnel with morning light",
        link: "<%=require('./images/5-photo-by-van-anh-nguyen-from-pexels.jpg')%>",
    },
    {
        name: "Mountain house",
        link: "<%=require('./images/6-photo-by-moritz-feldmann-from-pexels.jpg')%>",
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
