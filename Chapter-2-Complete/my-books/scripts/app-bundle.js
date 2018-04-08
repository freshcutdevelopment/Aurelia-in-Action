define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'My-Books';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'index' }, { route: 'books', name: 'books', moduleId: './resources/elements/books' }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/book-api',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BookApi = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var BookApi = exports.BookApi = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function BookApi(http) {
      _classCallCheck(this, BookApi);

      this.http = http;
    }

    BookApi.prototype.getBooks = function getBooks() {

      return this.http.fetch('books.json').then(function (response) {
        return response.json();
      }).then(function (books) {
        return books;
      });
    };

    return BookApi;
  }()) || _class);
});
define('resources/elements/book-list',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BookList = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var BookList = exports.BookList = (_class = function BookList() {
    _classCallCheck(this, BookList);

    _initDefineProp(this, 'books', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'books', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/elements/books',['exports', 'aurelia-framework', '../../services/book-api'], function (exports, _aureliaFramework, _bookApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Books = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Books = exports.Books = (_dec = (0, _aureliaFramework.inject)(_bookApi.BookApi), _dec(_class = function () {
    function Books(bookApi) {
      _classCallCheck(this, Books);

      this.bookTitle = "";
      this.books = [];
      this.bookApi = bookApi;
    }

    Books.prototype.addBook = function addBook() {
      this.books.push({ title: this.bookTitle });
      this.bookTitle = "";
    };

    Books.prototype.bind = function bind() {
      var _this = this;

      this.bookApi.getBooks().then(function (savedBooks) {
        return _this.books = savedBooks;
      });
    };

    return Books;
  }()) || _class);
});
define('resources/elements/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!index.html', ['module'], function(module) { module.exports = "<template><h1>my-books</h1><p>my-books allows you to keep track of the books you've read by adding and rating them as you read.</p><a route-href=\"route: books;\">books</a></template>"; });
define('text!resources/elements/book-list.html', ['module'], function(module) { module.exports = "<template><ul><li repeat.for=\"book of books\">${book.title}</li></ul></template>"; });
define('text!resources/elements/books.html', ['module'], function(module) { module.exports = "<template><require from=\"./book-list\"></require><h1>Books</h1><form submit.trigger=\"addBook()\"><label for=\"book-title\"></label> <input value.bind=\"bookTitle\" id=\"book-title\" type=\"text\" placeholder=\"book title...\"> <input type=\"submit\" value=\"add\"></form><hr><book-list books.bind=\"books\"></book-list></template>"; });
define('text!resources/elements/index.html', ['module'], function(module) { module.exports = "<template><h1>my-books</h1><p>my-books allows you to keep track of the books you've read by adding and rating them as you read.</p><a route-href=\"route: books;\">books</a></template>"; });
//# sourceMappingURL=app-bundle.js.map