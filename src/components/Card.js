// Класс карточек
export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleCardDelete }, cardSelector) {
    //console.log(data)
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._description = `Фотография места. ${data.name}`;
    this.id = data._id;
    this._currentUserId = data.currentUser;
    this._owner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector;
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
      this._likeNumber = this._cardElement.querySelector('.element__like-number')
      this._cardDelButtonElement = this._cardElement.querySelector('.element__button-delet');
      this._likeNumber.textContent = this._likes.length;
      this._setDelButtonState()
      this._setEventListeners();
      this._updateLikes();
      this._cardNameElement.textContent = this._name;
      this._cardPhotoElement.setAttribute('src', this._link);
      this._cardPhotoElement.setAttribute('alt', this._description);
      return this._cardElement;
    }
  
  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._cardLikeBtn = this._cardElement.querySelector('.element__button-like'); 

    this._cardLikeElement.addEventListener('click', () => this._handleLikeClick(this));

    this._cardDelButtonElement.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._cardPhotoElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, this._description);
    });
  }

  handleServerResForLike(updatedCardData) {
    this._updateLikesData(updatedCardData);
    this._setLikeNumber();
    this._invertIsLiked();
    this._toggleLikeElementState();
  }

  isLiked(){
    return Boolean(this._likes.some(user => user._id === this._currentUserId))
  }

  _setLikeNumber() {
    this._likeNumber.textContent = this._likes.length;
  }

  _updateLikes(){
    if(this.isLiked()){
      this._cardLikeBtn.classList.add('element__button-like_active')
    }else{
      this._cardLikeBtn.classList.remove('element__button-like_active')
    }
  }

  _invertIsLiked() {
    this.isLiked = !this.isLiked;
  }

  _toggleLikeElementState() {
    this._cardLikeElement.classList.toggle('element__button-like_active');
  }

  _setDelButtonState() {
    if (this._isOwn()) {
      this._cardDelButtonElement.classList.remove('element__delete_inactive');
    } else {
      this._cardDelButtonElement.classList.add('element__delete_inactive');
    }
  }

  _isOwn() {
    return this._owner.id === this._currentUserId ? true : false;
  }


  // Удаление карточки
  deleteCard() {
    this._cardElement.remove();
  }


}