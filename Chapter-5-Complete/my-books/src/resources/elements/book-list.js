import {bindable} from 'aurelia-framework';

export class BookList {
  @bindable books;
  
  removeBook(index){
      this.books.splice(index, 1);
  }

  filterFunc(searchExpression, value){
     
     let itemValue = value.title;
     if(!searchExpression || !itemValue) return false;
     
     return itemValue.toUpperCase().indexOf(searchExpression.toUpperCase()) !== -1;
     
  }
}