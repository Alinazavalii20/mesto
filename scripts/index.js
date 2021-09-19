const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__button-edit');
const popupCloseBtn = popup.querySelector('.popup__close');

let form = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_username');
let jobInput = popup.querySelector('.popup__input_userjob');

let nameProfile = document.querySelector('.profile__name');
let subtitleProfile = document.querySelector('.profile__subtitle');


function popupOpen() {
  popup.classList.add('popup__opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
}

function popupClose() {
  popup.classList.remove('popup__opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  popupClose();
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
form.addEventListener('submit', formSubmitHandler);