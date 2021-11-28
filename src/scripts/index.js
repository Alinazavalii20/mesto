//импорт

import { FormValidator, validationConfig } from '../components/FormValidator.js'
import Card from '../components/Card.js';
import section from '../components/section.js';
import '../pages/index.css';

import {
  initialCards,
  cardsContainerSelector,
  photoPopupSelector,
  profilePopupSelector,
  userNameElementSelector,
  userDescriptionSelector,
  cardTemplateSelector,
  cardPopupSelector,
} from '../utils/constants.js'

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import UserInfo from '../components/UserInfo.js'



//попап редактирования профиля пользователя
const profilePopupOpenBtn = document.querySelector('.profile__button-edit');
const profileFormElement =  document
    .querySelector('.popup_type_profile')
    .querySelector('.popup__form')
    
//попап добавления новой карточки

const cardPopupOpenBtn = document.querySelector('.profile__button-plus');
const cardFormElement = document
  .querySelector('.popup_type_card')
  .querySelector('.popup__form');

//--------------------------------------------------------------------------------------

// Добавление карточки с фотографией в список
function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: (photoTitle, photoLink, photoDescription) => {
       popupWithImage.open(photoTitle, photoLink, photoDescription);
      },
    },
    cardTemplateSelector
  );
  return card.generateCard();

}

const cardSection = new section(
  {
    renderer: data => {
      const cardElement = createCard(data);
      return cardSection.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardSection.renderItems(initialCards);

// экземпляр класса для попапа создания карточки
const popupWithCardForm = new PopupWithForm({
  popupSelector: cardPopupSelector,
  formSubmitHandler: inputValues => {
    const cardElement = createCard(inputValues)
    cardSection.addItem(cardElement)
    popupWithCardForm.close();
  },
});

popupWithCardForm.setEventListeners();

// экземпляр класса для попапа профиля пользователя
const popupWithProfileForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  formSubmitHandler: inputValues => {
    userInfo.setUserInfo(inputValues);
    popupWithProfileForm.close();
  },
});
popupWithProfileForm.setEventListeners();

// экземпляр класса для попапа просмотра фотографии
const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();
// Создаём экземпляр класса с данными о пользователе
const userInfo = new UserInfo(userNameElementSelector, userDescriptionSelector);

const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();

//  открытие попапа редактирования профиля
profilePopupOpenBtn.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  popupWithProfileForm.setInputValues(userInfo.getUserInfo()); // передаем поля профиля в инпуты формы
  popupWithProfileForm.open();
});

//открытие попапа добавления новой карточки
cardPopupOpenBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupWithCardForm.open();
});