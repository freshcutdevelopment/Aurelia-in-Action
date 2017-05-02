import {bindable, computedFrom, observable} from 'aurelia-framework'; 

export class AddBook {
  
  @bindable books; 
  @observable bookTitle = ""; 

  constructor(){
    this.bookTitle = ""; 
  }

  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }

   @computedFrom('bookTitle.length') 
   get canAdd(){
       return this.bookTitle.length === 0;
   }

   bookTitleChanged(newValue, oldValue){ 
      console.log(`Book title changed, 
                   Old Value : ${oldValue}, 
                   New Value: ${newValue}`);
  }
}