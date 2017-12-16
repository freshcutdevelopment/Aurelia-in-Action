export class TestHelper {
    static mockResponseAsync(body) {
      return Promise.resolve(
              { 
                  json: () => Promise.resolve(body) 
              });
    }
  
    static shadowContent(querySelector) {
      return document.querySelector(querySelector).shadowRoot;
    }
  
    static clickAndWait(element) {
      element.click();
      return new Promise(setTimeout);
    }
  
    static fireJQueryEventAndWait(selector, eventType) {
      $(selector)[eventType]();
   
      return new Promise(setTimeout);
    }
  }
  