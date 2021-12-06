import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._imageElement = this._popupElement.querySelector('.popup__image');
      this._titleElement = this._popupElement.querySelector('.popup__title');
    }
    open(data) {
      super.open();
      this._titleElement.textContent = data.name;
      this._imageElement.src = data.link;
      this._imageElement.alt = data.name;
      
    }
  }