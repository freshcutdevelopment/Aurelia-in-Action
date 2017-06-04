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
                  {id: 1,  name:'Art'}, 
                  {id: 2,  name:'Autobiographies'}, 
                  {id: 3,  name:'Cookbooks'}, 
                  {id: 4,  name:'Drama'}, 
                  {id: 5,  name:'Childrens'}, 
                  {id: 6,  name:'Fantasy'}, 
                  {id: 7,  name:'History'}, 
                  {id: 8,  name:'Mystery'}, 
                  {id: 9,  name:'Romance'}, 
                  {id: 10, name:'Science'}, 
                  {id: 11, name:'Satire'}, 
                  {id: 12, name:'Science Fiction'}, 
                  {id: 13, name:'Travel'}
                ];

  
    return this.simulateFetch(genres);
  }

  simulateFetch(fetchResult){
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(fetchResult);
        }, this.simulatedLatency);
      });
  }

  saveBook(book){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(book);
      }, this.simulatedLatency);
    });
  }
}