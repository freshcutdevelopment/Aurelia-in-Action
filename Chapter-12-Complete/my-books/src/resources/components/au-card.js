import {bindable, useShadowDOM} from 'aurelia-framework';

@useShadowDOM()
export class AuCard{
  
  @bindable book;
  
  constructor(){
    this.editDescription = false;  
  }
  
  bind(){
    this.description = this.book.description;
  }
  
  enableEditDescription(){
    this.editDescription = true;
   
    setTimeout(_ => {
      this.editDescriptionElement.focus();
    }, 1);
  }
  
  saveBookDescription(){
    this.editDescription = false;
    this.book.description = this.description;
  }
  
  cancelEditDescription(){
    this.editDescription = false;
    this.description = this.book.description;
  }
}