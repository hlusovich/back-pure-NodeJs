const {v4, validate} = require('uuid');
const MyError = require('../MyError/MyError');
const personFieldsValidator = require('../validators/personFieldsValidator');

class Users {
    constructor() {
        this._users = [];
    }

    addUser(user) {
        let id = v4();
        while (this._users.find(item => item.id === id)) {
            id = v4();
        }
        const createdUser = {...user, id};
        this._users.push(createdUser);
        return createdUser;
    }

    deleteUser(id) {
        if (validate(id)) {
            const user = this._users.find(item => item.id === id);
            if (user) {
                this._users = this._users.filter(item => item.id !== id);
                return true;
            }
            throw  new MyError("User with this id isn't exist, please check it", 404);
        } else {
            throw  new MyError("UUID isn't valid, please check it", 400);
        }

    }

    getAllUsers() {
        return this._users;
    }

    editUser(id, payload) {
        if (validate(id)) {
            let user = this._users.find(item => item.id === id);
            if (user) {
                user = {...user, ...payload};
                personFieldsValidator(user);
                this._users = this._users.map(item => {
                    if (item.id === id) {
                        return user
                    }
                    return item;
                });
                return user;
            } else {
                throw  new MyError("User with this id isn't exist, please check it", 404);
            }
        } else {
            throw  new MyError("UUID isn't valid, please check it", 400);
        }

    }

    getUser(id) {
        if (validate(id)) {
            const user = this._users.find(item => item.id === id);
            if (user) {
                return user;
            }
            throw  new MyError("User with this id isn't exist, please check it", 404);
        } else {
            throw  new MyError("UUID isn't valid, please check it", 400);
        }

    }

}

module.exports = new Users();
