import {bindable} from 'aurelia-framework';

export class BookList {
  @bindable books;
  
  removeBook(index){
      this.books.splice(index, 1);
  }
}