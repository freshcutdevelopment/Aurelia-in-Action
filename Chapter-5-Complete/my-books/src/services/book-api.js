import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApi{
  
  constructor(http){
    this.http = http;
  }

  getBooks(){

    return this.http.fetch('books.json')
         .then(response => response.json())
         .then(books => {
           return books;
         });

  }
}