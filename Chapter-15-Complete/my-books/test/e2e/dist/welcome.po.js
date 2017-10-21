'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageObjectWelcome = exports.PageObjectWelcome = function () {
  function PageObjectWelcome() {
    _classCallCheck(this, PageObjectWelcome);
  }

  PageObjectWelcome.prototype.getGreeting = function getGreeting() {
    return element(by.tagName('h2')).getText();
  };

  PageObjectWelcome.prototype.setFirstname = function setFirstname(value) {
    return element(by.valueBind('firstName')).clear().sendKeys(value);
  };

  PageObjectWelcome.prototype.setLastname = function setLastname(value) {
    return element(by.valueBind('lastName')).clear().sendKeys(value);
  };

  PageObjectWelcome.prototype.getFullname = function getFullname() {
    return element(by.css('.help-block')).getText();
  };

  PageObjectWelcome.prototype.pressSubmitButton = function pressSubmitButton() {
    return element(by.css('button[type="submit"]')).click();
  };

  PageObjectWelcome.prototype.openAlertDialog = function openAlertDialog() {
    var _this = this;

    return browser.wait(function () {
      _this.pressSubmitButton();

      return browser.switchTo().alert().then(function (alert) {
        alert.accept();return true;
      }, function () {
        return false;
      });
    });
  };

  return PageObjectWelcome;
}();
//# sourceMappingURL=welcome.po.js.map
