'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageObjectSkeleton = exports.PageObjectSkeleton = function () {
  function PageObjectSkeleton() {
    _classCallCheck(this, PageObjectSkeleton);
  }

  PageObjectSkeleton.prototype.getCurrentPageTitle = function getCurrentPageTitle() {
    return browser.getTitle();
  };

  PageObjectSkeleton.prototype.navigateTo = function navigateTo(href) {
    element(by.css('a[href="' + href + '"]')).click();
    return browser.waitForRouterComplete();
  };

  return PageObjectSkeleton;
}();
//# sourceMappingURL=skeleton.po.js.map
