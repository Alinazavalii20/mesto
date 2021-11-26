export default class UserInfo{
    constructor(userNameSelector, userDescriptionSelector) {
        this._userNameSelector = userNameSelector;
        this._userDescriptionSelector = userDescriptionSelector;
        this._userNameElement = document.querySelector(userNameSelector);
        this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    }

    getUserInfo(){
        return{
            userName: this._userNameElement.textContent,
            userDescription: this._userDescriptionElement.textContent,
        }
    }

    setUserInfo({username, userjob}) {
        this._userNameElement.textContent = username;
        this._userDescriptionElement.textContent = userjob;
    }
}