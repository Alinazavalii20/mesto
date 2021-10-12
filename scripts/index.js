//попап редактирования профиля пользователя
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupOpenBtn = document.querySelector('.profile__button-edit');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__close');

const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_username');
const jobInput =profilePopup.querySelector('.popup__input_type_userjob');
const nameProfile = document.querySelector('.profile__name');
const subtitleProfile = document.querySelector('.profile__subtitle');

//попап добавления новой карточки
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupOpenBtn = document.querySelector('.profile__button-plus');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close');
const cardForm = cardPopup.querySelector('.popup__form');
const placeInput = cardPopup.querySelector('.popup__input_type_place');
const linkInput = cardPopup.querySelector('.popup__input_type_link');

//просмотр фото
const photoPopup = document.querySelector('.popup_type_image');
const photoPopupCloseBtn = photoPopup.querySelector('.popup__close');
const photoPopupImg = photoPopup.querySelector('.popup__image');
const photoPopupTitle = photoPopup.querySelector('.popup__title');

//галерея
const elementList = document.querySelector('.elements')
const cardTemplate = document.querySelector('.element-temple')

//загрузка на странице. массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCards(initialCards) {
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector('.element__title');
  const newCardImg = newCard.querySelector('.element__image');
  newCardTitle.textContent = initialCards.name;
  newCardImg.setAttribute('src', initialCards.link);
  newCardImg.setAttribute('alt', initialCards.description);
  newCard.querySelector('.element__button-like').addEventListener('click', likeToggle);
  newCard.querySelector(".element__bitton-delet").addEventListener('click', deleteCard);
  newCardImg.addEventListener("click", () => openPhoto(newCardTitle.textContent, newCardImg.src, newCardImg.alt));
  return newCard;  
}

function addCardToGalery(element) {
  elementList.prepend(element);
}

function createAndAddCardToGalery(initialCards){
  const newCard = createCards(initialCards);
  addCardToGalery(newCard)
}

function addCardSubmitHandler(evt){
  evt.preventDefault();
  const newCard ={
    name: placeInput.value,
    link: linkInput.value,
    description: `Фотография места. ${placeInput.value}`,
  }
  createAndAddCardToGalery(newCard)
  closePopup(cardPopup); 
}

// Открытие попапа 
function openPopup(popupType) {
  popupType.classList.add("popup_opened");  
}

// Закрытие попапа 
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}

//открытие редактора профиля
function openProfilePopup(){
  nameInput.value = nameProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
  openPopup(profilePopup)
}

//Сохранение в форме редактирования
function profileSubmitHandler(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Открытие фотографии для просмотра
function openPhoto(name, link, alt) {
  photoPopupTitle.textContent = name;
  photoPopupImg.src = link;
  photoPopupImg.alt = alt;
  openPopup(photoPopup);
}

//лайк
function likeToggle(evt) {
  evt.currentTarget.classList.toggle('element__button-like_active')
}

//удаление
function deleteCard(evt) {
  const deletedCard = evt.currentTarget.closest(".element");
  deletedCard.remove();
}


//заполнение карточками
initialCards.forEach(createAndAddCardToGalery);

//клики
//редактор
profilePopupOpenBtn.addEventListener('click', () => openPopup(profilePopup))
profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));
profileForm.addEventListener('submit', profileSubmitHandler);

//сохранение
cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup));
cardPopupCloseBtn.addEventListener('click', () => closePopup(cardPopup));
cardForm.addEventListener('submit', addCardSubmitHandler);

//закрытие попапа с фото
photoPopupCloseBtn.addEventListener("click", () => closePopup(photoPopup));
