//импорт
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js';
import {validationConfig} from './FormValidator.js'

//
export {openPhoto}

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
//const cardTemplate = document.querySelector('.element-temple')

//все попапы
const popups = document.querySelectorAll('.popup')

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

//--------------------------------------------------------------------------------------

function addCardSubmitHandler(evt){
  evt.preventDefault();
  const newCard ={
    name: placeInput.value,
    link: linkInput.value,
    description: `Фотография места. ${placeInput.value}`,
  }
  createAndAddCardToGalery(newCard);
  cardForm.reset();
  closePopup(cardPopup);
}

function createCard(newCard) {
  const card = new Card(newCard, '.element-temple');
  const cardElement = card.generateCard();
  return cardElement;
}

function createAndAddCardToGalery(newCard) {
  const cardElement = createCard(newCard);
  elementList.prepend(cardElement);
}

//function createAndAddCardToGalery(cardElement){
 // const newCard = createCard(cardElement);
 // addCardToGalery(newCard)
//}


// Закрытие попапа (Esc)
function closePopupEsc(evt){
  if (evt.key === 'Escape'){
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}


// Открытие попапа 
function openPopup(popupType) {
  popupType.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

// Закрытие попапа 
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupEsc);
}

// Закрытие попапа (Overlay)
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
})


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


//заполнение карточками
initialCards.forEach(createAndAddCardToGalery);

//клики
//редактор
profilePopupOpenBtn.addEventListener('click', () => openProfilePopup(profilePopup))
profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));
profileForm.addEventListener('submit', profileSubmitHandler);


//сохранение
cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup));
cardPopupCloseBtn.addEventListener('click', () => closePopup(cardPopup));
cardForm.addEventListener('submit', addCardSubmitHandler);

//закрытие попапа с фото
photoPopupCloseBtn.addEventListener("click", () => closePopup(photoPopup));

