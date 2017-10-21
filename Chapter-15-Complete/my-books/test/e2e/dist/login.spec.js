"use strict";

var _appPo = require("./app.po.js");

var _loginPo = require("./login.po.js");

describe("my-books", function () {
  var poLogin = void 0;
  var poApp = void 0;

  beforeEach(function () {
    poApp = new _appPo.PageObjectApp();
    poLogin = new _loginPo.PageObjectLogin();

    browser.loadAndWaitForAureliaPage("http://localhost:9000");
  });

  it("should load the page and display the initial page title", function () {
    expect(poApp.getCurrentPageTitle()).toBe("login | My-Books");
  });

  it("should display a header", function () {
    expect(poLogin.getHeader()).toBe("my-books");
  });

  it("it should fail to log in with invalid password", function () {
    poLogin.setUsername("Bilbo");
    poLogin.setPassword("password3");
    poLogin.pressSubmitButton();

    browser.sleep(200);
    expect(poLogin.getLoginError()).toBe("Authentication failed. Invalid user name or password.");
  });

  it("it should login with valid username and password", function () {
    poLogin.setUsername("Bilbo");
    poLogin.setPassword("password1");
    poLogin.pressSubmitButton();

    browser.sleep(200);
    expect(poApp.getCurrentPageTitle()).toBe("home | My-Books");
  });
});
//# sourceMappingURL=login.spec.js.map
