import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi{
    
    constructor(http){
        this.http = http;
        
        const baseUrl = 'http://localhost:8333/api/';

        http.configure(config => {
            config.withBaseUrl(baseUrl)
                .withInterceptor({
                    request(request) {
                        if(request.method == 'POST'){
                            request.headers['awesesome-custom-header'] = 'aurelia-in-action';
                        }
                        console.log("request", request);
                        return request;
                    },
                    response(response) {
                        console.log("response", response);
                        return response;
                    }
                });
        });
    }

    getBooks(){

        return this.http.fetch('books')
                 .then(response => response.json())
                 .then(books => {
                    return books;
                 });

    }

    getShelves(){

        return this.http.fetch('shelves')
                 .then(response => response.json())
                 .then(shelves => {
                    return shelves;
                 });
    }

    getGenres(){

        return this.http.fetch('genres')
                 .then(response => response.json())
                 .then(genres => {
                    return genres;
                 });
    }

    addBook(book){
        return this.http.fetch('books', {
            method: 'post',
            body: json(book)
            })
            .then(response => response.json())
            .then(createdBook => {
                return createdBook;
            });
    }

    deleteBook(book){
        return this.http.fetch(`book/${book._id}`, {
                method: 'delete'
                })
                .then(response => response.json())
                .then(responseMessage => {
                    return responseMessage;
                });
    }

    saveBook(book){
        return this.http.fetch(`book/${book._id}`, {
                    method: 'put',
                    body: json(book)
                 })
                 .then(response => response.json())
                 .then(savedBook => {
                    return savedBook;
                 });

    }
}