import {bindable, inject, computedFrom, NewInstance} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BookApi} from '../../services/book-api';
import {BootstrapFormRenderer} from '../../renderers/bootstrap-form-renderer';
import {ValidationRules, ValidationController} from 'aurelia-validation';
import _ from 'lodash';

@inject(EventAggregator, BookApi,NewInstance.of(ValidationController) )
export class EditBook{
    
    @bindable editMode;
    @bindable book;
    @bindable selectedGenre;
    @bindable genres = [];
    @bindable shelves = [];
    temporaryBook = new Book();

    constructor(eventAggregator, bookApi, controller ){
        
        this.controller = controller;
        this.controller.addRenderer(new BootstrapFormRenderer());
        this.eventAggregator = eventAggregator;
        this.bookApi = bookApi;
        this.ratingChangedListener =  e => this.temporaryBook.rating = e.rating;
        this.editingShelves = false;
        this.saved = false;
    }

    bind(){
        this.resetTempBook();
        this.ratingElement.addEventListener("change", this.ratingChangedListener);
        this.selectedShelves = this.shelves.filter(shelf => this.temporaryBook.shelves.indexOf(shelf.name) !== -1);
        this.selectedGenre = this.genres.find(g => g._id == this.book.genre);
    }

    selectedGenreChanged(newValue, oldValue){
        if(!newValue) return;
        this.temporaryBook.genre = newValue._id;
    }

    attached(){
        this.bookSaveCompleteSubscription = 
            this.eventAggregator
            .subscribe(`book-save-complete-${this.book._id}`, 
                        () =>  this.bookSaveComplete());
    }

    editModeChanged(editModeNew, editModeOld){
        if(editModeNew) this.resetTempBook();
    }

    @computedFrom('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating', 'temporaryBook.ownACopy', 'temporaryBook.genre', 'saved', 'temporaryBook.shelves')
    get canSave(){
        if(!this.temporaryBook._id) return false;

        let clean = this.temporaryBook.title == this.book.title && 
               this.temporaryBook.genre == this.book.genre &&
               this.temporaryBook.rating == this.book.rating &&
               this.temporaryBook.ownACopy == this.book.ownACopy &&
               this.temporaryBook.description == this.book.description &&
               this.temporaryBook.shelves == this.book.shelves;

        return !clean;
    }

    resetTempBook(){
        Object.assign(this.temporaryBook, this.book);
    }

    cancel(){
        let book = Object.assign(new Book(), this.book);
        this.temporaryBook = book;
        this.starRatingViewModel.applyRating(this.temporaryBook.rating);
        this.toggleEditMode();
    }
    
    save(){
        this.controller.validate()
                        .then(result => {
                            if (result.valid) {
                                this.loading = true;
                                this.publishBookSavedEvent();
                            } 
                        });
    }

    toggleEditShelves(){
        this.editingShelves = !this.editingShelves;
    }

    unToggleEditShelves(){
        this.temporaryBook.shelves = this.selectedShelves.map(shelf => shelf.name);
        this.editingShelves = !this.editingShelves;
    }

    bookSaveComplete(){
        this.loading = false;
        this.saved = true;
        setTimeout(() => {
           this.saved = false;
           this.toggleEditMode();  
        }, 500);  
    }

    publishBookSavedEvent(){
        this.eventAggregator.publish('save-book', this.temporaryBook);
    }

    toggleEditMode(){
        this.saved = false;
        this.eventAggregator.publish('edit-mode-changed', !this.editMode );
    }

    detached(){
        this.ratingElement.removeEventListener('change', this.ratingChangedListener);
        this.bookSaveCompleteSubscription.dispose();
    }
}
export class Book {
  title='';
  description='';
  timesRead = 0;
}

ValidationRules.customRule(
  'positiveInteger',
  (value, obj) => value === null || value === undefined 
    || (Number.isInteger(value) || value >= 0),
  `Books can only be read 0 or more times.` 
);

ValidationRules
  .ensure(a => a.title).required()
  .ensure('timesRead')
  .required()
  .satisfiesRule('positiveInteger')
  .on(Book);
