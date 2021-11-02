// Объект настроек с селекторами и классами элементов, используемых при валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  invalidInputClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_activ',
  submitButtonClass: 'popup__save_inactive',
};

// Класс "Валидатор формы"
class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._invalidInputClass = validationConfig.invalidInputClass;
    this._errorClass = validationConfig.errorClass;
    this._submitButtonClass = validationConfig.submitButtonClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    this._submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  }
  
  _hasInvalidInput() {
    return this._inputList.some(input => {
      return input.validity.valid === false;
    });
  }
  
  _showError(input, error) {
    input.classList.add(this._invalidInputClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }
  
  _hideError(input, error) {
    input.classList.remove(this._invalidInputClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }
  
  _isValid(input) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(input, error);
    } else {
      this._hideError(input, error);
    }
  }

  _toggleButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._submitButtonClass);
      button.removeAttribute("disabled");
    } else {
      button.classList.add(this._submitButtonClass);
      button.setAttribute("disabled", "true");
    }
  };

 _setEventListeners() {
  const inputList = this._formElement.querySelectorAll(this._inputSelector);
  const submitButton = this._formElement.querySelector(this._submitButtonSelector);
  const isFormValid = this._formElement.checkValidity();
  this._toggleButtonState(submitButton, isFormValid);
  Array.from(inputList).forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const isFormValid = this._formElement.checkValidity();
      this._isValid(inputElement);
      this._toggleButtonState(submitButton, isFormValid);
    });
  });
  this._formElement.addEventListener("reset", () => {
    this._toggleButtonState(submitButton, isFormValid);
  });
};
  
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator, validationConfig };