import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class BookList {
  @bindable books;
  @bindable shelves;
  @bindable genres;
  
  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }
}