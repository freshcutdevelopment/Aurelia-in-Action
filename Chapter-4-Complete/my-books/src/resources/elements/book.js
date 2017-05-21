import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, Element)
export class Book{

    @bindable book;   
    @bindable editMode;

    constructor(eventAggregator, element){
        this.eventAggregator = eventAggregator;
        this.element = element;
    }

    markRead(){
        this.book.readDate = new Date();
        this.eventAggregator.publish('book-read', this.book.Id);
    }

    removeBook(){
        this.eventAggregator.publish('book-removed', this.book.Id);
    }

    toggleEditMode(event){
        this.editMode = !this.editMode;
    }

    bind(){
        this.subscribeToEvents();
    }

    subscribeToEvents(){
        this.editModeChangedSubscription = this.eventAggregator.subscribe('edit-mode-changed', mode => {
            this.editMode = mode; 
        });

        this.bookChanged = this.eventAggregator.subscribe(`book-changed-${this.book.Id}`, book => {
            this.book = book; 
        });
    }

    unbind(){
        this.editModeChangedSubscription.dispose();
        this.bookChanged.dispose();
    }
}