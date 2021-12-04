import  Popup  from './Popup.js';

export default class PopupWithSubmit extends Popup {
  setEventListeners() {
    super.setEventListeners();
    const formWithSubmit = this._popup.querySelector('.popup__form')
    formWithSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._formSubmit();
    });
  }

  setSubmitAction(submitAction) {
    this._formSubmit = submitAction;
  }
}