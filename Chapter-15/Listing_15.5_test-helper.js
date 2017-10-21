export class TestHelper {
    static mockResponseUnwrapped(body) {
      return Promise.resolve(this.mockResponse(body));
    }
  
    static mockResponse(body) {
      let result = { json: () => Promise.resolve(body) };
  
      return result;
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
  