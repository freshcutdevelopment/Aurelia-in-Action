import {computedFrom, bindable} from 'aurelia-framework'; 

export class BookStats{
 
  @bindable books;
  @bindable originalNumberOfBooks;

  @computedFrom('originalNumberOfBooks', 'books.length')
  get addedBooks(){
      return this.books.length - this.originalNumberOfBooks; 
  }
}
