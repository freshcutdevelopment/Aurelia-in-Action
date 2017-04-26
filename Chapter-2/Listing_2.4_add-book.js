import {bindable} from 'aurelia-framework';

export class AddBook {
  
  @bindable books; 

  constructor(){
    this.bookTitle = ""; 
  }

  addBook () {
    this.books.push({Title : this.bookTitle});
    this.bookTitle = "";
  }
}
