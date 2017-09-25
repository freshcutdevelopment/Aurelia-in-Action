import {noView, inject} from 'aurelia-framework';

@noView()
@inject(Element)
export class Alerter{
  
    constructor(element){
      this.element = element;
      this.alerter = _ => {
        alert("hello world");
      };
    }
  
    attached(){
        this.button = document.createElement("button");
        this.button.className += "btn btn-outline-primary";
        let content = document.createTextNode("alert");
        
        this.button.appendChild(content);
        
        this.element.appendChild(this.button);
        
        this.button.addEventListener('click', this.alerter, false);
    }
    
    detached(){
      this.button.removeEventListener('click', this.alerter, false);
    }
}