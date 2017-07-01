import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class BookList {
  @bindable books;
  @bindable genres;
  @bindable shelves;
  
  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }
}