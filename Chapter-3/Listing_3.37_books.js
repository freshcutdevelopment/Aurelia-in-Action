import {bindable, inject, observable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {BookApi} from '../../services/book-api';

@inject(BookApi, BindingSignaler )
export class Books {

  @observable bookTitle = ""; 

  constructor(bookApi, bindingSignaler){
    this.books = [];
    this.bookApi = bookApi;
    this.bindingSignaler = bindingSignaler; 
  }
  
  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }
  
  bind(){
    this.bookApi.getBooks().then(savedBooks => this.books = savedBooks);
  }

  get canAdd(){
      return this.bookTitle.length === 0;
  }

  refreshSignal(){
      this.bindingSignaler.signal('can-add-signal');
  }

  bookTitleChanged(newValue, oldValue){ 
    console.log(`Book title changed, 
                  Old Value : ${oldValue}, 
                  New Value: ${newValue}`);
  }
}
