import {bindable, inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import _ from 'lodash';

@inject(EventAggregator,)
export class EditBook{
    
    @bindable editMode;
    @bindable book;

    constructor(eventAggregator){
        this.resetTempBook();
        this.eventAggregator = eventAggregator;
    }

    bind(){
        this.resetTempBook(); 
    }

    editModeChanged(editModeNew, editModeOld){
        if(editModeNew) this.resetTempBook();
    }

    @computedFrom('temporaryBook.title', 
                  'temporaryBook.description')
    get canSave(){
        return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
    }

    resetTempBook(){
        let book = Object.assign(new Book(), this.book);
        this.temporaryBook = book;
        Object.assign(this.temporaryBook, this.book);
    }

    cancel(){
        this.temporaryBook = this.book;
        this.toggleEditMode();
    }
    
    save(){
        this.loading = true;
        this.publishBookSavedEvent();
    }

    bookSaveComplete(){
        this.loading = false;
        this.saved = true;
        setTimeout(() => {
           this.resetTempBook();
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
        this.bookSaveCompleteSubscription.dispose();
    }
}