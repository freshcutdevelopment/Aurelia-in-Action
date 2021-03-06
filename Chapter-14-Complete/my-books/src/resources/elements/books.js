import {bindable, inject, computedFrom} from 'aurelia-framework';
import {BookApi} from '../../services/book-api';
import {BookApiJSONP} from '../../services/book-api-jsonp';
import {EventAggregator} from 'aurelia-event-aggregator';
import _ from 'lodash';

@inject(BookApi, EventAggregator, BookApiJSONP)
export class Books {

  constructor(bookApi, eventAggregator,bookApiJSONP){
    this.bookTitle = ""; 
    this.books = [];
    this.genres = [];
    this.shelves = [];
    this.bookApi = bookApi;
    this.eventAggregator = eventAggregator;
    this.bookApiJSONP = bookApiJSONP;
    this.loaded = false;
  }
  
  addBook () {
    this.bookApi.addBook({title : this.bookTitle}).then(createdBook => {
        this.books.push(createdBook);
        this.bookTitle = "";
    });
  }
  
  removeBook(toRemove){
    
    this.bookApi.deleteBook(toRemove).then(() => {
      let bookIndex = _.findIndex(this.books, book => {
        return book._id === toRemove._id;
      });

      this.books.splice(bookIndex, 1);
      });
  }

  bind(){
    this.loadBooks();
    this.loadShelves();
    this.loadGenres();
  }

  loadBooks(){
      this.bookApi.getBooks()
              .then(savedBooks => {
                this.books = savedBooks;
                this.loaded = true;
              });
  }

  loadShelves(){
      this.bookApi.getShelves()
            .then(shelves => {
                this.shelves = shelves;
               
            });
  }

  loadGenres(){
        this.bookApi.getGenres()
            .then(genres =>{
                this.genres = genres;
            });
  }

  attached(){
    this.subscribeToEvents();
  }

  subscribeToEvents(){
      this.bookRemovedSubscription = 
           this.eventAggregator.subscribe('book-removed', 
                                bookIndex => this.removeBook(bookIndex));

      this.bookSavedSubscription = 
      this.eventAggregator.subscribe('save-book', 
                                     book => this.bookSaved(book));
  }

  bookSaved(updatedBook){
      this.bookApi
          .saveBook(updatedBook)
          .then((savedBook) => {
              let index = this.books.findIndex(book => book._id == savedBook._id);

              Object.assign(this.books[index], savedBook);

              this.eventAggregator.publish(`book-save-complete-${savedBook._id}`);
          });
  }
  
  @computedFrom('bookTitle.length') 
  get canAdd(){
      return this.bookTitle.length === 0;
  }

  detached(){
    this.bookRemovedSubscription.dispose();
    this.bookSavedSubscription.dispose();
  }
}
