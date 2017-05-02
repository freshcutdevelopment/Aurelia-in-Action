import {bindable} from 'aurelia-framework';
import {BookApi} from '../../services/book-api';
import {inject} from 'aurelia-framework';

@inject(BookApi)
export class BookList {
  @bindable books;

  constructor(bookApi){
    this.bookApi = bookApi;

    this.bookApi.getBooks().then(savedBooks => {

      savedBooks.map(book => {
        this.books.push(book);
      });

    });
  }

  bookLocation(isFirst, isLast){
    
      if(isFirst) return '- first book'; 
      if(isLast)  return '- last book';

      return '';
  }

  removeBook(index){
      this.books.splice(index, 1);
  }
}