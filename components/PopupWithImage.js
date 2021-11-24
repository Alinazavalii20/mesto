import {Popup} from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this.imageElement = this._popupElement.querySelector('.popup__image');
      this.titleElement = this._popupElement.querySelector('.popup__title');
    }
    open(photoTitle, photoLink, photoDescription) {
      this.titleElement.textContent = photoTitle;
      this.imageElement.src = photoLink;
      this.imageElement.alt = photoDescription;
      super.open();
    }
  }