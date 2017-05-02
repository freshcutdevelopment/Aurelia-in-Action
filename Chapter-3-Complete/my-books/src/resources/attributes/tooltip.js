import {inject, bindable} from 'aurelia-framework';

@inject(Element)
export class TooltipCustomAttribute{

    @bindable title;
    @bindable placement;

    constructor(element){
        this.element = element;
    }

    attached(){
        $(this.element).tooltip({title: this.title, placement : this.placement});
    }   
    
    detached(){
        $(this.element).tooltip('dispose');
    } 
}