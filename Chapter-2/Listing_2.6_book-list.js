import {bindable} from 'aurelia-framework';

export class BookList {
  @bindable books;

  constructor(){
    this.books = [];
  }
}