import {bindable, inject} from 'aurelia-framework';
import {UserApi} from '../../services/user-api';

@inject(UserApi)
export class UserDetails{

    constructor(userApi){
        this.userApi = userApi;
    }

    activate(params, routeConfig) {
        this.loadUser(params.name);
    }

    loadUser(name){
        this.userApi.getUser(name).then(fetchedUser => {
            this.user = fetchedUser;
        });
    }

    saveUser(){
        this.userApi.saveUser(this.user).then(savedUser => {
            alert('Successfully saved user');
        });
    }
}