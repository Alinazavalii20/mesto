export default class UserInfo{
    constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
        this._userNameSelector = userNameSelector;
        this._userDescriptionSelector = userDescriptionSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo(){
        return{
            userName: this._userNameElement.textContent,
            userDescription: this._userDescriptionElement.textContent,
        }
    }

    getUserAvatar(){
        return{
            userAvatar: this._userAvatarElement.src
        }
    }

    setUserInfo({name, about, avatar}) {
        this._userNameElement.textContent = name;
        this._userDescriptionElement.textContent = about;
        this._userAvatarElement.src = avatar;
    }
}