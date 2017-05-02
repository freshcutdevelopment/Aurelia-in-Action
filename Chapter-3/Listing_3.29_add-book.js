import {bindable, computedFrom} from 'aurelia-framework';

export class AddBook {
  
  @bindable books; 

  constructor(){
    this.bookTitle = ""; 
  }

  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }

   @computedFrom('bookTitle.length') 
   get canAdd(){
       return this.bookTitle.length === 0;
   }
}