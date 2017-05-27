import {bindable, inject} from 'aurelia-framework';
import {BookApi} from 'book-api';

@inject(BookApi)
export class App {

  constructor(bookApi){
    this.bookTitle = ""; 
    this.books = [];
    this.bookApi = bookApi;
  }
  
  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }
  
  bind(){ 
    this.bookApi.getBooks().then(savedBooks => this.books = savedBooks);
  }
}
