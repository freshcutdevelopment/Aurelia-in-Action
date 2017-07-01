import {bindable, inject, computedFrom,observable} from 'aurelia-framework';
import {BookApi} from '../../services/book-api';

@inject(BookApi)
export class Books {

  @observable bookTitle = ""; 

  constructor(bookApi){
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

  @computedFrom('bookTitle.length') 
  get canAdd(){
      return this.bookTitle.length === 0;
  }
  bookTitleChanged(newValue, oldValue){ 
    console.log(`Book title changed, 
                  Old Value : ${oldValue}, 
                  New Value: ${newValue}`);
  }
}
