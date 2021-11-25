//импорт

import { FormValidator, validationConfig } from '../components/FormValidator.js';
import Card from '../components/Card.js';
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
import Section from '../components/section.js';
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


const cardSection = new Section(
  {
    initialCards,
    renderer: data => {
      const card = new Card(
        {
          data,
          handleCardClick: (photoTitle, photoLink, photoDescription) => {
            popupWithImage.setEventListeners();
            popupWithImage.open(photoCaption, photoLink, photoDescription);
          },
        },
        cardTemplateSelector
      );
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  cardsContainerSelector
);

// Заполняем галерею карточками
cardSection.renderItems();

// экземпляр класса для попапа создания карточки
const popupWithCardForm = new PopupWithForm({
  popupSelector: cardPopupSelector,
  // передаем обработчик события отправки формы создания карточки
  formSubmitHandler: inputValues => {
    cardSection._items = [inputValues];
    cardSection.renderItems();
    popupWithCardForm.close();
  },
});

// экземпляр класса для попапа профиля пользователя
const popupWithProfileForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  formSubmitHandler: inputValues => {
    userInfo.setUserInfo(inputValues);
    popupWithProfileForm.close();
  },
});

// экземпляр класса для попапа просмотра фотографии
const popupWithImage = new PopupWithImage(photoPopupSelector);

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