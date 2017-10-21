import {PageObjectApp} from './app.po.js'
import {PageObjectLogin} from './login.po.js';

describe('my-books', function() {
  let poLogin;
  let poApp;

  beforeEach(() => {
    poApp   = new PageObjectApp();
    poLogin = new PageObjectLogin();

    browser.loadAndWaitForAureliaPage('http://localhost:9000');
  });

  it('should load the page and display the initial page title', () => {
    expect(poApp.getCurrentPageTitle()).toBe('login | My-Books');
  });

  it('should display a header', () => {
    expect(poLogin.getHeader()).toBe('my-books');
  });

  it('it should fail to log in with invalid password', () => {
    poLogin.setUsername('Bilbo');
    poLogin.setPassword('password3');
    poLogin.pressSubmitButton();

    browser.sleep(200);
    expect(poLogin.getLoginError()).toBe('Authentication failed. Invalid user name or password.');
  });

  it('it should login with valid username and password', () => {
    poLogin.setUsername('Bilbo');
    poLogin.setPassword('password1');
    poLogin.pressSubmitButton();

    browser.sleep(200);
    expect(poApp.getCurrentPageTitle()).toBe('home | My-Books');
  });

 
});