import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmitCallback }) {
      super(popupSelector);
      this._formSubmitCallback = formSubmitCallback;
      this._formElement = this._popupElement.querySelector('.popup__form');
      this._inputElements = Array.from(this._formElement.querySelectorAll('input'));
      this._formSubmit = this._formSubmit.bind(this);
      this._sumbitButton = this._popupElement.querySelector('.popup__save');
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

    renderLoading(boolean) {
      if (boolean === true) {
        this._sumbitButton.textContent = 'Сохранение...'
      } else {
        this._sumbitButton.textContent = 'Сохранить'
      }
    }

    close() {
      super.close();
      //this._popupElement.removeEventListener('submit', this._bindedHandleFormSubmit);
      this._formElement.reset();
    }
  }