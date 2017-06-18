import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi{
    
    constructor(http){
        this.http = http;
        this.simulatedLatency = 500;
        
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

    saveBook(book){
        return this.simulateFetch(book);
    }

    simulateFetch(fetchResult){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(fetchResult);
            }, this.simulatedLatency);
        });
    }
}