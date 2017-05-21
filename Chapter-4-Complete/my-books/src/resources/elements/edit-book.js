import {bindable, inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import _ from 'lodash';
import {BookApi} from '../../services/book-api';

@inject(BookApi, EventAggregator,)
export class EditBook{
    
    @bindable editMode;
    @bindable book;

    constructor(bookApi, eventAggregator){
        this.eventAggregator = eventAggregator;
        this.bookApi = bookApi;
        this.ratingChangedListener =  e => this.temporaryBook.rating = e.detail.rating;
    }

    bind(){
        this.resetTempBook(); 
        this.ratingElement.addEventListener("change", this.ratingChangedListener);
    }

    editModeChanged(editModeNew, editModeOld){
        if(editModeNew) this.resetTempBook();
    }

    @computedFrom('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating')
    get canSave(){
        return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
    }

    resetTempBook(){
        this.temporaryBook = Object.assign({}, this.book);
    }

    cancel(){
        this.temporaryBook = this.book;

        this.starRatingViewModel.applyRating(this.temporaryBook.rating);

        this.toggleEditMode();
    }
    
    save(){
        this.loading = true;
        this.bookApi.saveBook(this.temporaryBook).then((savedBook) => {

            this.loading = false;

            this.saved = true;
            setTimeout(() => {
                this.saved = false;
                this.publishBookSavedEvent();
            }, 500);   
        })
    }

    publishBookSavedEvent(){
        this.eventAggregator.publish(`book-changed-${this.temporaryBook.Id}`, this.temporaryBook );
        this.toggleEditMode();        
    }

    toggleEditMode(){
        this.eventAggregator.publish('edit-mode-changed', !this.editMode );
    }

    detached(){
        this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    }
}