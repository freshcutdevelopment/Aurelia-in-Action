import {bindable, inject, computedFrom} from 'aurelia-framework';
import {BookApi} from '../../services/book-api';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(BookApi, EventAggregator)
export class Books {

  constructor(bookApi, eventAggregator){
    this.bookTitle = ""; 
    this.books = [];
    this.bookApi = bookApi;
    this.eventAggregator = eventAggregator;
  }
  
  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }
  
  removeBook(bookIndex){
    this.books.splice(bookIndex, 1);
  }

  bind(){
    this.bookApi.getBooks()
                .then(savedBooks => 
                      this.books = savedBooks);
  }

  attached(){
    this.bookRemovedSubscription = this.eventAggregator.subscribe('book-removed', 
                                                        bookIndex => this.removeBook(bookIndex));
  }
  
  @computedFrom('bookTitle.length') 
  get canAdd(){
      return this.bookTitle.length === 0;
  }

  detached(){
    this.bookRemovedSubscription.dispose();
  }
}
