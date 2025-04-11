// const showInputError = (formElement, inputElement, errorMessage, config) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(config.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(config.errorClass);
// };

// const hideInputError = (formElement, inputElement, config) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(config.inputErrorClass);
//     errorElement.classList.remove(config.errorClass);
//     errorElement.textContent = "";
// };

// const checkInputValidity = (formElement, inputElement, config) => {
//     if (!inputElement.validity.valid) {
//         showInputError(
//             formElement,
//             inputElement,
//             inputElement.validationMessage,
//             config
//         );
//     } else {
//         hideInputError(formElement, inputElement, config);
//     }
// };

// const setEventListeners = (formElement, config) => {
//     const inputList = Array.from(
//         formElement.querySelectorAll(config.inputSelector)
//     );
//     const submitButton = formElement.querySelector(config.submitButtonSelector);

//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener("input", function () {
//             checkInputValidity(formElement, inputElement, config);
//             toggleSubmitButton(inputList, submitButton, config);
//         });
//     });
// };

// function deactivateSubmitbutton(btn, config) {
//     btn.classList.add(config.inactiveButtonClass);
//     btn.disabled = true;
// }

// function activateSubmitbutton(btn, config) {
//     btn.classList.remove(config.inactiveButtonClass);
//     btn.disabled = false;
// }

// function toggleSubmitButton(inputFields, submitButton, config) {
//     const isValid = [...inputFields].every((input) => input.validity.valid);

//     if (isValid) {
//         activateSubmitbutton(submitButton, config);
//     } else {
//         deactivateSubmitbutton(submitButton, config);
//     }
// }

// const enableValidation = (config) => {
//     const forms = document.querySelectorAll(config.formSelector);
//     forms.forEach((formElement) => {
//         setEventListeners(formElement, config);
//     });
// };

// enableValidation(settings);
