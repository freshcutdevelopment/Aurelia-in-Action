import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi{
    
    constructor(http){
        this.http = http;
        this.simulatedLatency = 500;
    }

    getBooks(){

        return this.http.fetch('books.json')
                 .then(response => response.json())
                 .then(books => {
                   return books;
                 });

    }

    getShelves(){

        let shelves = [
                        'Classics',
                        'Want to read',
                        'Research',
                        'For the kids',
                      ];
                    
        return this.simulateFetch(shelves);

    }

    getGenres(){

        let genres = [ 
                        {id: 1, name:'Art'}, 
                        {id: 2, name:'Autobiographies'}, 
                        {id: 3, name:'Drama'}, 
                        {id: 4, name:'Childrens'}, 
                        {id: 5, name:'Fantasy'}, 
                        {id: 6, name:'History'}, 
                        {id: 7, name:'Mystery'}, 
                        {id: 8, name:'Romance'}, 
                        {id: 9, name:'Science'}, 
                        {id: 10,name:'Science Fiction'},
                    ];

        return this.simulateFetch(genres);
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