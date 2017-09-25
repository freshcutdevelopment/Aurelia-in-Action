import {customAttribute, inject} from 'aurelia-framework';

@customAttribute('red')
@inject(Element)
export class Red{
  constructor(element){
    this.element = element;
    this.element.style.color = 'red';
  }
}