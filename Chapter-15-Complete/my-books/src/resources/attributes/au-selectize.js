import selectize from 'selectize';
import {dynamicOptions, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@dynamicOptions
@inject(Element, HttpClient)
export class AuSelectizeCustomAttribute{

    constructor(element, http){
        this.element = element;
        this.http = http;
        this.selected = [];
    }

    attached(){
        if(this.url) this.initializeRemoteSelectize();
        else{
            this.initializeClientSelectize();
        }
    }

    initializeClientSelectize(){
        this.selectizeElement = $(this.element).selectize()[0];
    }

    initializeRemoteSelectize(){
        this.selectizeElement = $(this.element).selectize({
            valueField:  this.valueField,
            labelField:  this.labelField,
            searchField: this.searchField,
            preload: true,
            options: [],
            load: (query, callback) => {
                this.http.fetch(this.url).then(response => response.json())
                .then(data => {
                   callback(data);
                })
               .catch(error => {
                    callback();
               });
            }
        })[0];

        this.selectizeElement.selectize.on('change', () => {
            let notice = new Event('change', {bubbles: true});
            $(this.element)[0].dispatchEvent(notice);
        });
        
    }

    unbind(){
        this.selectizeElement.selectize.destroy();
    }
}