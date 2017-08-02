import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class UserApi{
    
    constructor(http){
        this.http = http;
        
        const baseUrl = 'http://localhost:8333/api/';

        http.configure(config => {
            config.withBaseUrl(baseUrl);
        });
    }

     getUser(name){
        return this.http.fetch(`users/${name}`)
                 .then(response => response.json())
                 .then(user => {
                    return user;
                 })
                .catch(error => {
                    console.log('Error retrieving user.');
                });

    }

    getUsers(){

        return this.http.fetch('users')
                 .then(response => response.json())
                 .then(users => {
                    return users;
                 })
                .catch(error => {
                    console.log('Error retrieving users.');
                });

    }
 
    addUser(user){
        return this.http.fetch('users', {
            method: 'post',
            body: json(user)
            })
            .then(response => response.json())
            .then(createdUser => {
                return createdUser;
            })
            .catch(error => {
                console.log('Error adding user');
            });
    }

    deleteUser(user){
        return this.http.fetch(`users/${user.name}`, {
                method: 'delete'
                })
                .then(response => response.json())
                .then(responseMessage => {
                    return responseMessage;
                })
                .catch(error => {
                    console.log('Error deleting book');
                });
    }

    saveUser(user){
        return this.http.fetch(`users/${user.name}`, {
                    method: 'put',
                    body: json(user)
                 })
                 .then(response => response.json())
                 .then(savedUser => {
                    return savedUser;
                 })
                .catch(error => {
                    console.log('Error saving book');
                });
    }
}