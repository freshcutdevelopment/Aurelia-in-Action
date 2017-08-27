import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class ShareBook{
    
    constructor(dialogController){
        this.controller = dialogController;
    }

    activate(book){
        this.book = book;
    }
}