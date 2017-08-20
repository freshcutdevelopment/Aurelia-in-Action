import {inject, bindable} from 'aurelia-framework';

export class AuForm{

  
  constructor(){
    this.properties = [
      {
          name : "Title", 
          value : "War and Peace", 
          controlType: "au-text-box", 
          placeholder:'Enter a title'},
      {
          name : "Description", 
          value : "A rather long book", 
          controlType: "au-text-area"},
      {
          name : "Read", 
          value: true, 
          controlType: "au-checkbox"
      }
    ];
  }
  
  addBook(){
    alert(`book added with title ${this.properties[0].value} `);
  }
  
}