import { validationConfig } from "../utils/constants.js";

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
  // Сброс
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(input => {
      const error = this._formElement.querySelector(`.${input.id}-error`);
      this._hideError(input, error);
    });
  }
 
  _hasInvalidInput() {
    return this._inputList.some(input => {
      return input.validity.valid === false;
    });
  }
 
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._submitButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._submitButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
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
 
  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValid(input);
      });
    });
  }
  
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator, validationConfig };