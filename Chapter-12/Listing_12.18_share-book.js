import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class ShareBook{
    
    completedFont  = "fa fa-check fa-3x";
    completedStyle = "color:#27ae60";
    loadingFont    = "fa fa-spinner fa-pulse fa-3x fa-fw";

    constructor(dialogController){
        this.controller = dialogController;
        this.state = "sharing";
    }

    activate(book){
        this.book = book;
    }

    ok(book){
        this.state = "loading";
        this.font  = this.loadingFont;
        setTimeout(_ => this.complete(book) , 500);
    }

    complete(book){
        this.state = "complete";
        this.font  = this.completedFont;
        this.fontColor = this.completedStyle;
        setTimeout(_ => this.controller.ok(book) , 800);
    }
}