import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmitCallback }) {
      super(popupSelector);
      this._formSubmitCallback = formSubmitCallback;
      this._formElement = this._popupElement.querySelector('.popup__form');
      this._inputElements = Array.from(this._formElement.querySelectorAll('input'));
      this._formSubmit = this._formSubmit.bind(this);
      this._sumbitButton = this._popupElement.querySelector('.popup__save-button');
    }
    setInputValues({ userName, userDescription }) {
      this._userNameInputElement = this._formElement.querySelector('.popup__input_type_username');
      this._userDescriptionInputElement = this._formElement.querySelector('.popup__input_type_userjob');
      this._userAvatarInputElement = this._formElement.querySelector('.popup__input_type_avatar');
      this._userNameInputElement.value = userName;
      this._userDescriptionInputElement.value = userDescription;
      //this._userAvatarInputElement.value = userAvatar;
    }
    _getInputValues() {
      const inputValues = {};
      this._inputElements.forEach(input => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    }
    _formSubmit(evt) {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._formSubmitCallback(inputValues);
    }
    setEventListeners() {
      super.setEventListeners();
      this._popupElement.addEventListener('submit', this._formSubmit);
    }

    close() {
      super.close();
      //this._popupElement.removeEventListener('submit', this._bindedHandleFormSubmit);
      this._formElement.reset();
    }
  }