import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Layout{
    @bindable router;
    constructor(router){
        this.router = router;
    }
}