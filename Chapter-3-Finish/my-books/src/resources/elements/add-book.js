import {bindable} from 'aurelia-framework';

export class AddBook {
  
  @bindable books; 

  constructor(){
    this.bookTitle = ""; 
  }

  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }
}