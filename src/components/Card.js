export default class Card {
  constructor( {data, handleCardClick, handleDeleteCard, handleLikeClick}, cardSelector){
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._userIdCurrent = data.currentUser;
    this._owner = data.owner
    this._cardSelector = cardSelector;
    this._handleDeleteCard = handleDeleteCard
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }
  _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.element')
        .cloneNode(true);
      return cardElement;
  }
  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__title').textContent = this._name;
    this._likeCounter = this._card.querySelector('.element__like-number')
    const cardImage = this._card.querySelector('.element__image');
    this._likeCounter.textContent = this._likes.length
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._deleteButtomCard()
    this._setEventListeners();
    this._switchLikes()
    return this._card;
}

  _setEventListeners() {
    this._card.querySelector('.element__button-like').addEventListener('click', () => this._handleLikeClick(this));
    this._card.querySelector('.element__button-delet').addEventListener('click', () => this._handleDeleteCard(this));
    this._card.querySelector('.element__image').addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    });
  }

  isLiked() {
   return this._likes.some(user => user._id === this._userIdCurrent)
  }

  updateLikes(dataLikes) {
    this._likes = dataLikes;
    this._likeCounter.textContent = dataLikes.length;
    this._switchLikes();
  }

  _switchLikes() {
    if(this.isLiked()){
      this._card.querySelector('.element__button-like').classList.add('element__button-like_active');
    } else {
      this._card.querySelector('.element__button-like').classList.remove('element__button-like_active');
    }
  }

  _deleteButtomCard() {
    if (this._userIdCurrent !== this._owner._id) {
      this._card.querySelector('.element__button-delet').classList.add('element__delete_inactive');
    }
  }

  deleteCard() {
    this._card.remove()
  }
}