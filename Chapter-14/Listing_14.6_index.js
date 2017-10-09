import {CssAnimator} from 'aurelia-animator-css';  
import {inject} from 'aurelia-framework';

@inject(CssAnimator, Element)
export class Index{

    constructor(animator, element) {
        this.animator = animator;
        this.element = element;
        this.isAttached = false;
    }
    
    attached(){
        this.isAttached = true;
    }
}