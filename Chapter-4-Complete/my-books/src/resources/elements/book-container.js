import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class BookContainer{
    @bindable book;    

    constructor(eventAggregator){
        this.eventAggregator = eventAggregator;
    }

    bind(){
        this.bookReadSubscription = this.eventAggregator.subscribe('book-read', bookId => {
            if(this.book.Id === bookId) this.book.read = true;
        });
    }

    unbind(){
        this.bookReadSubscription.dispose();
    }
}