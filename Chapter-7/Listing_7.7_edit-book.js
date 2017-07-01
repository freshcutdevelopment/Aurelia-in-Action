import {bindable, inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BookApi} from '../../services/book-api';
import _ from 'lodash';

@inject(EventAggregator, BookApi )
export class EditBook{
    
    @bindable editMode;
    @bindable book;
    @bindable selectedGenre;

    constructor(eventAggregator, bookApi ){
        this.resetTempBook();

        this.eventAggregator = eventAggregator;
        this.bookApi = bookApi;
        this.ratingChangedListener =  e => this.temporaryBook.rating = e.rating;
        this.editingShelves = false;

    }

    bind(){

        //apply the temporary book rating once the rating value has been made available in bind hook
        this.temporaryBook.rating = this.book.rating; 

        this.loadGenres();
        this.loadShelves();

        this.ratingElement.addEventListener("change", this.ratingChangedListener);
    }

    loadGenres(){
        this.bookApi.getGenres()
            .then(genres =>{
                this.genres = genres;
                this.selectedGenre = this.genres.find(g => g.id == this.book.genre);
            });
    }

    selectedGenreChanged(newValue, oldValue){
        if(!newValue) return;
        this.temporaryBook.genre = newValue.id;
    }

    attached(){
        this.bookSaveCompleteSubscription = this.eventAggregator.subscribe(`book-save-complete-${this.book.Id}`, () =>  this.bookSaveComplete());
    }

    editModeChanged(editModeNew, editModeOld){
        if(editModeNew) this.resetTempBook();
    }

    @computedFrom('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating', 'temporaryBook.ownACopy', 'temporaryBook.genre')
    get canSave(){
        return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
    }

    resetTempBook(){
        this.temporaryBook = Object.assign({}, this.book);
    }

    loadShelves(){
        this.bookApi.getShelves()
            .then(shelves => {
                this.shelves = shelves;
            });
    }

    cancel(){
        this.temporaryBook = this.book;
        this.starRatingViewModel.applyRating(this.temporaryBook.rating);
        this.toggleEditMode();
    }
    
    save(){
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

    toggleEditMode(){
        this.eventAggregator.publish('edit-mode-changed', !this.editMode );
    }

    detached(){
        this.ratingElement.removeEventListener('change', this.ratingChangedListener);
        this.bookSaveCompleteSubscription.dispose();
    }
}