import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class BookApiJSONP{
    
    constructor(http){
        this.http = http;
        
        this.baseUrl = 'http://localhost:8333/api/';

        this.http.configure(config => {
            config.withBaseUrl(this.baseUrl);
        });
    }

    getBooksJsonp(){
       return this.http.jsonp('booksjsonp', 'callback')
          .then(responseMessage => { 
              return responseMessage.response;
          })
          .then(books => {
            return books;
          });
    }
}