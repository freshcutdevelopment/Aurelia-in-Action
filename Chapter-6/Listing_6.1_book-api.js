import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi{
    
    constructor(http){
        this.http = http;
        
        const baseUrl = 'http://localhost:8333/api/';

        http.configure(config => {
            config.withBaseUrl(baseUrl)
        })
    }

   getBooks(){

        return this.http.fetch('books')
                 .then(response => response.json())
                 .then(books => {
                    return books;
                 })
                .catch(error => {
                    console.log('Error retrieving books.');
                });

    }

    getShelves(){

        return this.http.fetch('shelves')
                 .then(response => response.json())
                 .then(shelves => {
                    return shelves;
                 })
                .catch(error => {
                    console.log('Error retrieving shelves.');
                });
    }

    getGenres(){

        return this.http.fetch('genres')
                 .then(response => response.json())
                 .then(genres => {
                    return genres;
                 })
                 .catch(error => {
                    console.log('Error retrieving genres.');
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
            })
            .catch(error => {
                console.log('Error adding book');
            });
    }

    deleteBook(book){
        return this.http.fetch(`book/${book._id}`, {
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

    saveBook(book){
        return this.http.fetch(`book/${book._id}`, {
                    method: 'put',
                    body: json(book)
                 })
                 .then(response => response.json())
                 .then(savedBook => {
                    return savedBook;
                 })
                .catch(error => {
                    console.log('Error saving book');
                });

    }
}