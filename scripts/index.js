const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.button__edit');
const popupCloseBtn = popup.querySelector('.popup__close');

let form = popup.querySelector('popup__profile');
let nameInput = popup.querySelector('.popup__input_username');
let jobInput = popup.querySelector('.popup__input_userjob');

let nameProfile = document.querySelector('.profile__name');
let subtitleProfile = document.querySelector('.profile__subtitle');

// Открытие попапа
function popupOpen() {
  popup.classList.add('popup__opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
}
// Закрытие попапа
function popupClose() {
  popup.classList.remove('popup__opened');
}
// Сохранение в форме ввода данных (перезапись полей профиля и закрытие попапа)
function formSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  nameProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  popupClose();
}

// Отслеживаем клики на кнопках открытия/закрытия попапа
popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);

// Отслеживаем клик на кнопке Сохранить в форме ввода данных
form.addEventListener('submit', formSubmitHandler);
formSubmitHandler();