import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class AuthService{

    constructor(http){
        this.http = http;
    }

    logIn(userName, password){

        return this.http.fetch('token', {
                method: 'post',
                body: json({name: userName, password : password})
            })
            .then(response => response.json())
            .then(tokenResult => {
                if(tokenResult.success) window.localStorage.setItem("token", tokenResult.token);
                return tokenResult;
            })
            .catch(error => {
                console.log('Error retrieving token');
            });
    }

    
    get tokenInterceptor(){
        let auth = this;
        return {
            request(request) {
                let token = auth.getToken();
                if(token){
                    request.headers.append('authorization', `bearer ${token}`);
                }
                return request; 
            }
        }
    }

    logOut(){
        window.localStorage.removeItem("token");
    }

    isLoggedIn(){
        let token = this.getToken();

        if(token) return true;

        return false;
    }

    getToken(){
        return window.localStorage.getItem("token");
    }

    getUser(){
        let token = this.decodeToken();

        return token._doc;
    }

    decodeToken(token){
        
        token = token || window.localStorage.getItem("token");

        if(!token) return;

        try {
            return JSON.parse(atob(token.split('.')[1]));
        }
        catch (e) {
            return null;
        }
    }
}