import {bindable} from 'aurelia-framework';

export class BookList {
  @bindable books;

  bookLocation(isFirst, isLast){
    
      if(isFirst) return '- first book'; 
      if(isLast)  return '- last book';

      return '';
  }

  removeBook(index){
      this.books.splice(index, 1);
  }
}