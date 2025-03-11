const forms = document.querySelectorAll(".modal__form");
const profileFormValidate = forms[0];

const editProfileNameValidate = profileFormValidate.querySelector("#name");
const editProfileDescValidate =
    profileFormValidate.querySelector("#description");

function validateInput(inputField) {
    const modalErrorText = inputField
        .closest(".modal__label")
        .querySelector(".modal__error-text");
    inputField.addEventListener("input", function (evt) {
        evt.preventDefault();
        if (inputField.validity.valid) {
            inputField.classList.remove("modal__input_error");
            modalErrorText.style = "display: none";
        } else {
            inputField.classList.add("modal__input_error");
            modalErrorText.style = "display: block";
            modalErrorText.textContent = inputField.validationMessage;
        }
    });
}

validateInput(editProfileNameValidate);
validateInput(editProfileDescValidate);
