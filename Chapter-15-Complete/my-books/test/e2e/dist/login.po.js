'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageObjectLogin = exports.PageObjectLogin = function () {
  function PageObjectLogin() {
    _classCallCheck(this, PageObjectLogin);
  }

  PageObjectLogin.prototype.getHeader = function getHeader() {
    return element(by.tagName('h1.brand-heading')).getText();
  };

  PageObjectLogin.prototype.setUsername = function setUsername(value) {
    return element(by.valueBind('userName')).clear().sendKeys(value);
  };

  PageObjectLogin.prototype.setPassword = function setPassword(value) {
    return element(by.valueBind('password')).clear().sendKeys(value);
  };

  PageObjectLogin.prototype.pressSubmitButton = function pressSubmitButton() {
    return element(by.css('button[type="submit"]')).click();
  };

  PageObjectLogin.prototype.getLoginError = function getLoginError() {
    return element(by.css('.card-body.login-error')).getText();
  };

  return PageObjectLogin;
}();
//# sourceMappingURL=login.po.js.map
