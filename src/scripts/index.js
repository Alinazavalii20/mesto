//ИМПОРТЫ
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js';
import section from '../components/section.js';
import Api from '../components/Api.js';
import '../pages/index.css';

import {
  initialCards,
  validationConfig,
  cardsContainerSelector,
  photoPopupSelector,
  profilePopupSelector,
  avatarPopupSelector,
  userNameElementSelector,
  userDescriptionSelector,
  userAvatarSelector,
  cardTemplateSelector,
  cardPopupSelector,
  popupCardDelete,
} from '../utils/constants.js'

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit  from '../components/PopupFormSubmit.js';
import UserInfo from '../components/UserInfo.js'


//элементы в DOM
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

// Попап аватара пользователя (кнопка открытия и форма ввода)
const avatarEditBtn = document.querySelector('.profile__avatar-overlay');
const avatarFormElement = document
  .querySelector('.popup_type_avatar')
  .querySelector('.popup__form');

const cardDelete = new PopupWithSubmit(popupCardDelete)
//--------------------------------------------------------------------------------------

// экземпляр класса для попапа просмотра фотографии
const popupWithImage = new PopupWithImage(photoPopupSelector);
popupWithImage.setEventListeners();

//--------------------------------------------------------------------------------------

const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-30',
  headers:{
    authorization: '0d0c1ecf-4cb6-4add-84fe-013c8fefdb82',
    'Content-Type': 'application/json'
  }
})

let userId = null;

Promise.all([api.getCards(), api.getUserInfo()])
    .then(([dataCards, dataUser]) => {
      
      userId = dataUser._id;
      userInfo.setUserInfo(dataUser);
      cardSection.renderItems(dataCards);
    })

// Добавление карточки с фотографией в список
function createCard(data) {
  const card = new Card(
    {
     data: {... data, currentUserId: userId},
      handleCardClick: (photoTitle, photoLink, photoDescription) => {
       popupWithImage.open(photoTitle, photoLink, photoDescription);
      },
      handleLikeClick: (card) => {
        if(card.isLiked()){
          api.setLike(card.id)
            .then(dataCard => card._toggleLikeElementState(dataCard.likes))
            .catch(err => console.log(err))
        }else{
          api.deleteLike(card.id)
            .then(dataCard => card._toggleLikeElementState(dataCard.likes))
            .catch(err => console.log(err))
        }
        
        //console.log(card.isLiked())
        //console.log(card);
      },
      handleDeleteCard: () => {
        cardDelete.setSubmitAction(() => {
          api.deleteCard(data)
          .then(() => {
            card.deleteCard()
            cardDelete.close()
          })
          .catch(err => console.log(err))
        })
        cardDelete.open()
      },
    },
    cardTemplateSelector
  );
  return card.generateCard();
}

const cardSection = new section(
  {
    initialCards,
    renderer: data => {
      const cardElement = createCard(data);
      return cardSection.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

// экземпляр класса для попапа создания карточки
const popupWithCardForm = new PopupWithForm({
  popupSelector: cardPopupSelector,
  formSubmitHandler: inputValues => {
    popupWithCardForm.changeBtnText('Сохранение...');
    api.postCard(inputValues)
      .then(сardData => {
        cardSection.items = [сardData];
        cardSection.renderItems();
        popupWithCardForm.close();
      })
      .catch(err => {console.log(err);})
      .finally(() => {
        popupWithCardForm.changeBtnText('Сохранить');
      });
  },
});
popupWithCardForm.setEventListeners();

// экземпляр класса для попапа профиля пользователя
const popupWithProfileForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  formSubmitHandler: inputValues => {
    popupWithProfileForm.changeBtnText('Сохранение...');
    api.editUser(inputValues)
      .then(newUserData => {
        UserInfo.setUserInfo(newUserData);
        UserInfo.getUserInfo(newUserData.name, newUserData.about);
        popupWithProfileForm.close();
      })
      .catch(err => {console.log(err)})
      .finally(() => {
        popupWithAvatarForm.changeBtnText('Сохранить');
      });
  },
});
popupWithProfileForm.setEventListeners();

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  formSubmitHandler: inputValues => {
    popupWithAvatarForm.changeBtnText('Сохранение...');
    api.updateAvatar(inputValues)
      .then(newUserData => {
        UserInfo.setUserInfo(newUserData);
        UserInfo.getUserInfo(newUserData.avatar);
        popupWithAvatarForm.close();
      })
      .catch(err => {console.log(err)})
      .finally(() => {
        popupWithAvatarForm.changeBtnText('Сохранить');
      });
      popupWithAvatarForm.close()
  },
})
popupWithAvatarForm.setEventListeners();

// Создаём экземпляр класса с данными о пользователе
const userInfo = new UserInfo(userNameElementSelector, userDescriptionSelector, userAvatarSelector);

// Валидации форм
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarFormElement);
avatarFormValidator.enableValidation();

//const cardDelete = new PopupWithSubmit(popupCardDelete);

//  открытие попапа редактирования профиля
profilePopupOpenBtn.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  popupWithProfileForm.setInputValues(userInfo.getUserInfo());
  popupWithProfileForm.open();
});

//открытие попапа добавления новой карточки
cardPopupOpenBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupWithCardForm.open();
});

//открытие попапа редактора фото
avatarEditBtn.addEventListener('click', () => 
  popupWithAvatarForm.open()
);