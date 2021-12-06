//ИМПОРТЫ
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js';
import section from '../components/section.js';
import Api from '../components/Api.js';
import './index.css';

import {
  initialCards,
  validationConfig,
  cardsContainerSelector,
  photoPopupSelector,
  profilePopupSelector,
  avatarPopupSelector,
  userNameSelector,
  userDescriptionSelector,
  userAvatarSelector,
  cardTemplateSelector,
  cardPopupSelector,
  popupCardDelete,
  popupName,
  popupAbout,
  popupAvatar
} from '../utils/constants.js'

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit  from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js'

const openPopupProfileBtn = document.querySelector('.profile__button-edit');
const profileFormElement = document
  .querySelector('.popup_type_profile')
  .querySelector('.popup__form');

// Попап аватара пользователя (кнопка открытия и форма ввода)
const avatarEditBtn = document.querySelector('.profile__avatar-overlay');
const avatarFormElement = document
  .querySelector('.popup_type_avatar')
  .querySelector('.popup__form');

// Попап карточки (кнопка открытия и форма ввода)
const openPopupCardBtn = document.querySelector('.profile__button-plus');
const cardFormElement = document
  .querySelector('.popup_type_card')
  .querySelector('.popup__form');

// экземпляр класса для попапа просмотра фотографии
const popupOpenImg = new PopupWithImage(photoPopupSelector);
popupOpenImg.setEventListeners();

const validatorEditProfile = new FormValidator(validationConfig, profileFormElement);
const validatorAddCard = new FormValidator(validationConfig, cardFormElement);
const validatorAddAvatar = new FormValidator(validationConfig, avatarFormElement);
const cardDelete = new PopupWithSubmit(popupCardDelete);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '0d0c1ecf-4cb6-4add-84fe-013c8fefdb82',
    'Content-Type' : 'application/json'
  }
})

let userId

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([data, dataCards]) => {
    userId = data._id;
    dataProfile.setUserInfo(data);
    cardSection.renderItems(dataCards)
  })
  .catch(err => console.log(err))
  



const dataProfile = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);
const editProfile = new PopupWithForm({
  popupSelector : profilePopupSelector,
  formSubmitCallback : (data) => {
    api.editUser(data)
    .then((data) => {
      dataProfile.setUserInfo(data)
      editProfile.close()
    })
    .catch(err => console.log(err))
  },
  })
  editProfile.setEventListeners()

const editAvatar = new PopupWithForm({
  popupSelector : avatarPopupSelector,
  formSubmitCallback : (data) => {
    api.updateAvatar(data)
      .then((data) => {
        dataProfile.setUserInfo(data);
        editAvatar.close();
      })
      .catch(err => console.log(err))
  },
})
editAvatar.setEventListeners()

const popupAvatarEdit = () => {
  editAvatar.open();
  const dataAvatarProfile = dataProfile.getUserAvatar()
  validatorAddAvatar.resetValidation();
  validatorAddAvatar._toggleButtonState();
  popupAvatar.value = dataAvatarProfile.userAvatar
}

avatarEditBtn.addEventListener('click', popupAvatarEdit)

const openPopupEdit = () => {
  editProfile.open()
  const dataEditProfile = dataProfile.getUserInfo()
  validatorEditProfile.resetValidation();
  validatorEditProfile._toggleButtonState();
  popupName.value = dataEditProfile.userName
  popupAbout.value = dataEditProfile.userDescription
  
}

openPopupProfileBtn.addEventListener('click', openPopupEdit)

// Код для карточек
const cardSection  = new section({
  initialCards,
  renderer: (dataCards) => {
  const element = createCard(dataCards)
  cardSection.addItem(element)
  }
}, cardsContainerSelector)

const createCard = (data) => {
  const card = new Card({
    data:{...data, currentUser : userId},
    handleCardClick: () => {
      popupOpenImg.open(data)
    },
    handleDeleteCard: (card) => {
      cardDelete.open()
      cardDelete.setSubmitAction(() => {
        api.deleteCard(card.id)
          .then(() => {
          card.deleteCard()
          cardDelete.close()
        })
        .catch(err => console.log(err))
      }) 
    },
    handleLikeClick: (data) => {
      if(card.isLiked()){
        api.deleteLike(data.id)
        .then(dataLikes => {
          card.updateLikes(dataLikes.likes)
        })
        .catch(err => console.log(`Ошибка удаления лайка: ${err}`))
      } else {
        api.setLike(data.id)
        .then(dataLikes => {
          card.updateLikes(dataLikes.likes)
        })
        .catch(err => console.log(err))
      }
    }
  }, cardTemplateSelector);
  return card.generateCard();
}
cardDelete.setEventListeners()

const cardItem = new PopupWithForm({
  popupSelector : cardPopupSelector,
  formSubmitCallback: (dataForm) => {
      api.postCard(dataForm)
      .then((res => {
        const addCard = createCard(res);
        cardSection.addItem(addCard);
        cardItem.close()}))
        .catch(err => console.log(err))
   },
})
cardItem.setEventListeners()

openPopupCardBtn.addEventListener('click', () => {
  cardItem.open();
  validatorAddCard.resetValidation()
  validatorAddCard._toggleButtonState();
})

const enableValidation = () => {
  validatorEditProfile.enableValidation();
  validatorAddCard.enableValidation();
  validatorAddAvatar.enableValidation()
}

enableValidation(validationConfig)