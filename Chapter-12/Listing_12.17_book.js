import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {ShareBook} from './share-book';

@inject(EventAggregator, DialogService)
export class Book{

    @bindable book; 
    @bindable genres;
    @bindable shelves;  
    @bindable searchTerm;
        
    constructor(eventAggregator, dialogService){
        this.eventAggregator = eventAggregator;
        this.editMode = false;
        this.dialogService = dialogService;
    }

    markRead(){
        this.book.readDate = new Date();
        this.book.read = true;
    }

    removeBook(){
        this.eventAggregator.publish('book-removed', this.book);
    }

    toggleEditMode(event){
        this.editMode = !this.editMode;
    }

    bind(){
        this.subscribeToEvents();
    }
    
    share(){
        this.dialogService.open(
        { 
            viewModel: ShareBook, 
            model: this.book
        })
        .whenClosed(response => {});
    }

    subscribeToEvents(){
        this.editModeChangedSubscription = 
            this.eventAggregator.subscribe('edit-mode-changed', mode => {
                                             this.editMode = mode; 
        });
    }

    unbind(){
        this.editModeChangedSubscription.dispose();
    }
}