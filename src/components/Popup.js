export default class Popup{
  constructor(popupSelector){
      this._popupSelector = popupSelector;
      this._popupElement = document.querySelector(this._popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleMouseClose = this._handleMouseClose.bind(this);
  }

  open(){
      this._popupElement.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened'); 
  }

  _handleEscClose(evt){
      if (evt.key === 'Escape'){
          this.close();
      }
  }

   _handleMouseClose(evt) {
  if (
    evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')
  ) {
    this.close();
  }
}

  setEventListeners(){
      
      this._popupElement.addEventListener('mousedown', this._handleMouseClose);
  }

}