import {bindable, inject} from 'aurelia-framework';
import {UserApi} from '../../services/user-api';

@inject(UserApi)
export class Users{
    constructor(userApi){
        this.userApi = userApi;
    }

    bind(){
        this.loadUsers();
    }

    loadUsers(){
        this.userApi.getUsers().then(users => {
            this.users = users;
        });
    }
}