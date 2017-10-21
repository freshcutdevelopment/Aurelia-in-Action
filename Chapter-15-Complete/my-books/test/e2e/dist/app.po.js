"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageObjectApp = exports.PageObjectApp = function () {
  function PageObjectApp() {
    _classCallCheck(this, PageObjectApp);
  }

  PageObjectApp.prototype.getCurrentPageTitle = function getCurrentPageTitle() {
    return browser.getTitle();
  };

  return PageObjectApp;
}();
//# sourceMappingURL=app.po.js.map
