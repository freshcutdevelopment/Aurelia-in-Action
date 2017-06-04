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
    temporaryBook = new Book();

    constructor(eventAggregator, bookApi, controller ){
        this.resetTempBook();
        this.controller = controller;
        this.controller.addRenderer(new BootstrapFormRenderer());

        this.eventAggregator = eventAggregator;
        this.bookApi = bookApi;
        this.editingShelves = false;
        this.ratingChangedListener =  e => this.temporaryBook.rating = e.rating;
    }

    bind(){

        this.temporaryBook.rating = this.book.rating; //apply the temporary book rating once the rating value has been made available in bind hook

        this.loadGenres();
        this.loadShelves();

        this.ratingElement.addEventListener("change", this.ratingChangedListener);

    }

    validate(){
        this.controller.validate();
    }

    loadGenres(){
        this.bookApi.getGenres()
            .then(genres =>{
                this.genres = genres;
                this.selectedGenre = this.genres.find(g => g.id == this.book.genre);
            });
    }

    loadShelves(){
        this.bookApi.getShelves()
            .then(shelves => {
                this.shelves = shelves;
            });
    }

    selectedGenreChanged(newValue, oldValue){
        if(!newValue) return;
        this.temporaryBook.genre = newValue.id;
    }

    editModeChanged(editModeNew, editModeOld){
        if(editModeNew) this.resetTempBook();
    }

    @computedFrom('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating', 'temporaryBook.genre')
    get canSave(){
        let compareBook = Object.assign(new Book(), this.book);
        return this.temporaryBook && !_.isEqual(this.temporaryBook, compareBook);
    }

    resetTempBook(){
        Object.assign(this.temporaryBook, this.book);
    }

    cancel(){
        this.temporaryBook = this.book;
        this.starRatingViewModel.applyRating(this.temporaryBook.rating);
        this.toggleEditMode();
    }
    
    save(){
        this.validate();
        this.loading = true;
        this.publishBookSavedEvent();
        
    }

    toggleEditShelves(){
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

    attached(){
        this.bookSaveCompleteSubscription = this.eventAggregator.subscribe(`book-save-complete-${this.book.Id}`, () =>  this.bookSaveComplete());
    }

    toggleEditMode(){
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
}

ValidationRules
  .ensure(a => a.title).required()
  .on(Book);
  
