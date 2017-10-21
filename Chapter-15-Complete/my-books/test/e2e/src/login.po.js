export class PageObjectLogin {
    
      constructor() {
    
      }

      getHeader() {
        return element(by.tagName('h1.brand-heading')).getText();
      }
      
      setUsername(value) {
        return element(by.valueBind('userName')).clear().sendKeys(value);
      }
    
      setPassword(value) {
        return element(by.valueBind('password')).clear().sendKeys(value);
      }

      pressSubmitButton() {
        return element(by.css('button[type="submit"]')).click();
      }

      getLoginError() {
        return element(by.css('.card-body.login-error')).getText();
      }
    }