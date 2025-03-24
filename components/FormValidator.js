class FormValidator {
    constructor(config, element) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._errorClass = config.errorClass;
        this._inputErrorClass = config.inputErrorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;

        this._formElement = element;
        this._inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        );
        this._buttonElement = this._formElement.querySelector(
            this._submitButtonSelector
        );
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElementId = `.${inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElementId = `.${inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    resetValidation() {
        this._formElement.reset();
        this._toggleButtonState();
    }
}

export default FormValidator;
