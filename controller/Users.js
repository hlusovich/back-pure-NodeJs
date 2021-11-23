const {v4} = require('uuid');

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
        this._users = this._users.filter(item => item.id !== id);
    }

    getAllUsers() {
        return this._users;
    }

    editUser(id, payload) {
        this._users = this._users.map(item => {
            if (item.id === id) {
                return {...item, ...payload};
            }
            return  item;
        });

    }
    getUser(id){
        return this._users.find(item=> item.id === id);
    }

}

module.exports = new Users();
