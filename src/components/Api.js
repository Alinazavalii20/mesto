function onResponce(res){
    return res.ok ? res.json() : Promise.reject( `Ошибка: ${res}`)  
}

export default class Api {
    constructor({url, headers}){
        this._url = url;
        this._headers = headers;
    }

    //получение карточек
    getCards(){
        return fetch(`${this._url}/cards`,{
           method: 'GET',
           headers: this._headers,
        })
          .then(onResponce)
    }
    
    //получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`,{
            method: 'GET',
            headers: this._headers,
         })
           .then(onResponce)
    }

    //поставить лайк
    setLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
         })
           .then(onResponce)
      }

    // Удаление лайка
    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(onResponce);
      }
    

    //Редактирование профиля
    editUser(){
        return fetch(`${this._url}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
         })
           .then(onResponce)
    }

    //Добавление новой карточки
    postCard(){
        return fetch(`${this._url}/cards`,{
            method: 'POST',
            headers: this._headers,
         })
           .then(onResponce)
    }


    //Обновление аватара пользователя
    updateAvatar(){
        return fetch(`${this._url}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
         })
           .then(onResponce) 
    }

    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId._id}`,{
            method: 'DELETE',
            headers: this._headers,
         })
           .then(onResponce) 
    }
}