import  Popup  from './Popup.js';

export default class PopupWithSubmit extends Popup {
  setEventListeners() {
    super.setEventListeners();
    const formWithSubmit = this._popupElement.querySelector('.popup__form')
    formWithSubmit.addEventListener('submit', this.handleFormSubmit);
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault()
    this._formSubmit();
  }

  setSubmitAction(submitAction) {
    this._formSubmit = submitAction;
  }
}