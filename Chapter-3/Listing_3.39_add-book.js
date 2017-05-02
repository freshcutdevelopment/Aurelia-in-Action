import {bindable, observable, inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(BindingSignaler)
export class AddBook {
 
  @bindable books; 
  @observable bookTitle = ""; 

  constructor(bindingSignaler){
      this.bindingSignaler = bindingSignaler; 
  }

  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }

  canAdd(){
      return this.bookTitle.length === 0;
  }

  refreshSignal(){
      this.bindingSignaler.signal('can-add-signal');
  }
}
