import {bindable, inject} from 'aurelia-framework';
import {UserApi} from '../../services/user-api';

@inject(UserApi)
export class Users{
    constructor(userApi){
        this.userApi = userApi;
    }

    activate(params, routConfig, navigationInstructions){
        console.log("activate");
    }

    bind(){
        console.log("bind");
        this.loadUsers();
    }

    attached(){
        console.log("attached");
    }

    loadUsers(){
        this.userApi.getUsers().then(users => {
            this.users = users;
        });
    }
}