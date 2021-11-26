// Класс карточек
export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._description = `Фотография места. ${data.name}`;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  // Получение шаблона разметки для новой карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  // Наполнение данными шаблона разметки карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardNameElement = this._cardElement.querySelector('.element__title');
    this._cardPhotoElement = this._cardElement.querySelector('.element__image');
    this._cardLikeElement = this._cardElement.querySelector('.element__button-like');
    this._cardDelButtonElement = this._cardElement.querySelector('.element__button-delet');
    this._setEventListeners();
    this._cardNameElement.textContent = this._name;
    this._cardPhotoElement.setAttribute('src', this._link);
    this._cardPhotoElement.setAttribute('alt', this._description);
    return this._cardElement;
  }
  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._cardLikeElement.addEventListener('click', () => {
      this._likeToggle();
    });
    this._cardDelButtonElement.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardPhotoElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }
  // Переключение лайка
  _likeToggle() {
    this._cardLikeElement.classList.toggle('element__button-like_active');
  }
  // Удаление карточки
  _deleteCard() {
    this._cardElement.remove();
  }
}