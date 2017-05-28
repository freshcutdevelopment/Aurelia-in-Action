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

    BookApi.prototype.saveBook = function saveBook(book) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(book);
        }, 1000);
      });
    };

    return BookApi;
  }()) || _class);
});
define('resources/attributes/tooltip',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TooltipCustomAttribute = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var TooltipCustomAttribute = exports.TooltipCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function TooltipCustomAttribute(element) {
            _classCallCheck(this, TooltipCustomAttribute);

            _initDefineProp(this, 'title', _descriptor, this);

            _initDefineProp(this, 'placement', _descriptor2, this);

            this.element = element;
        }

        TooltipCustomAttribute.prototype.attached = function attached() {
            $(this.element).tooltip({ title: this.title, placement: this.placement });
        };

        TooltipCustomAttribute.prototype.detached = function detached() {
            $(this.element).tooltip('dispose');
        };

        return TooltipCustomAttribute;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'title', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'placement', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/book-container',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BookContainer = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var BookContainer = exports.BookContainer = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function BookContainer(eventAggregator) {
            _classCallCheck(this, BookContainer);

            _initDefineProp(this, 'book', _descriptor, this);

            this.eventAggregator = eventAggregator;
        }

        BookContainer.prototype.bind = function bind() {
            var _this = this;

            this.bookReadSubscription = this.eventAggregator.subscribe('book-read', function (bookId) {
                if (_this.book.Id === bookId) _this.book.read = true;
            });
        };

        BookContainer.prototype.unbind = function unbind() {
            this.bookReadSubscription.dispose();
        };

        return BookContainer;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'book', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/book-list',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var BookList = exports.BookList = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function BookList(eventAggregator) {
      _classCallCheck(this, BookList);

      _initDefineProp(this, 'books', _descriptor, this);

      this.eventAggregator = eventAggregator;
    }

    BookList.prototype.removeBook = function removeBook(index) {
      this.eventAggregator.publish('book-removed', index);
    };

    return BookList;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'books', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('resources/elements/book-stats',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BookStats = undefined;

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

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var _dec, _desc, _value, _class, _descriptor, _descriptor2;

  var BookStats = exports.BookStats = (_dec = (0, _aureliaFramework.computedFrom)('originalNumberOfBooks', 'books.length'), (_class = function () {
    function BookStats() {
      _classCallCheck(this, BookStats);

      _initDefineProp(this, 'books', _descriptor, this);

      _initDefineProp(this, 'originalNumberOfBooks', _descriptor2, this);
    }

    _createClass(BookStats, [{
      key: 'addedBooks',
      get: function get() {
        return this.books.length - this.originalNumberOfBooks;
      }
    }]);

    return BookStats;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'books', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'originalNumberOfBooks', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, 'addedBooks', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'addedBooks'), _class.prototype)), _class));
});
define('resources/elements/book',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Book = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var Book = exports.Book = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, Element), _dec(_class = (_class2 = function () {
        function Book(eventAggregator, element) {
            _classCallCheck(this, Book);

            _initDefineProp(this, 'book', _descriptor, this);

            _initDefineProp(this, 'editMode', _descriptor2, this);

            this.eventAggregator = eventAggregator;
            this.element = element;
        }

        Book.prototype.markRead = function markRead() {
            this.book.readDate = new Date();
            this.book.read = true;
        };

        Book.prototype.removeBook = function removeBook() {
            this.eventAggregator.publish('book-removed', this.book.Id);
        };

        Book.prototype.toggleEditMode = function toggleEditMode(event) {
            this.editMode = !this.editMode;
        };

        Book.prototype.bind = function bind() {
            this.subscribeToEvents();
        };

        Book.prototype.subscribeToEvents = function subscribeToEvents() {
            var _this = this;

            this.editModeChangedSubscription = this.eventAggregator.subscribe('edit-mode-changed', function (mode) {
                _this.editMode = mode;
            });

            this.bookChanged = this.eventAggregator.subscribe('book-changed-' + this.book.Id, function (book) {
                _this.book = book;
            });
        };

        Book.prototype.unbind = function unbind() {
            this.editModeChangedSubscription.dispose();
            this.bookChanged.dispose();
        };

        return Book;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'book', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'editMode', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/books',['exports', 'aurelia-framework', '../../services/book-api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _bookApi, _aureliaEventAggregator) {
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

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var _dec, _dec2, _class, _desc, _value, _class2;

  var Books = exports.Books = (_dec = (0, _aureliaFramework.inject)(_bookApi.BookApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.computedFrom)('bookTitle.length'), _dec(_class = (_class2 = function () {
    function Books(bookApi, eventAggregator) {
      _classCallCheck(this, Books);

      this.bookTitle = "";
      this.books = [];
      this.bookApi = bookApi;
      this.eventAggregator = eventAggregator;
    }

    Books.prototype.addBook = function addBook() {
      this.books.push({ title: this.bookTitle });
      this.bookTitle = "";
    };

    Books.prototype.removeBook = function removeBook(bookIndex) {
      this.books.splice(bookIndex, 1);
    };

    Books.prototype.bind = function bind() {
      var _this = this;

      this.bookApi.getBooks().then(function (savedBooks) {
        return _this.books = savedBooks;
      });
    };

    Books.prototype.attached = function attached() {
      var _this2 = this;

      this.bookRemovedSubscription = this.eventAggregator.subscribe('book-removed', function (bookIndex) {
        return _this2.removeBook(bookIndex);
      });
    };

    Books.prototype.detached = function detached() {
      this.bookRemovedSubscription.dispose();
    };

    _createClass(Books, [{
      key: 'canAdd',
      get: function get() {
        return this.bookTitle.length === 0;
      }
    }]);

    return Books;
  }(), (_applyDecoratedDescriptor(_class2.prototype, 'canAdd', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'canAdd'), _class2.prototype)), _class2)) || _class);
});
define('resources/elements/edit-book',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'lodash', '../../services/book-api'], function (exports, _aureliaFramework, _aureliaEventAggregator, _lodash, _bookApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EditBook = undefined;

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

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

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var EditBook = exports.EditBook = (_dec = (0, _aureliaFramework.inject)(_bookApi.BookApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.computedFrom)('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating'), _dec(_class = (_class2 = function () {
        function EditBook(bookApi, eventAggregator) {
            var _this = this;

            _classCallCheck(this, EditBook);

            _initDefineProp(this, 'editMode', _descriptor, this);

            _initDefineProp(this, 'book', _descriptor2, this);

            this.eventAggregator = eventAggregator;
            this.bookApi = bookApi;
            this.ratingChangedListener = function (e) {
                return _this.temporaryBook.rating = e.detail.rating;
            };
        }

        EditBook.prototype.bind = function bind() {
            this.resetTempBook();
            this.ratingElement.addEventListener("change", this.ratingChangedListener);
        };

        EditBook.prototype.editModeChanged = function editModeChanged(editModeNew, editModeOld) {
            if (editModeNew) this.resetTempBook();
        };

        EditBook.prototype.resetTempBook = function resetTempBook() {
            this.temporaryBook = Object.assign({}, this.book);
        };

        EditBook.prototype.cancel = function cancel() {
            this.temporaryBook = this.book;

            this.starRatingViewModel.applyRating(this.temporaryBook.rating);

            this.toggleEditMode();
        };

        EditBook.prototype.save = function save() {
            var _this2 = this;

            this.loading = true;
            this.bookApi.saveBook(this.temporaryBook).then(function (savedBook) {

                _this2.loading = false;

                _this2.saved = true;
                setTimeout(function () {
                    _this2.saved = false;
                    _this2.publishBookSavedEvent();
                }, 500);
            });
        };

        EditBook.prototype.publishBookSavedEvent = function publishBookSavedEvent() {
            this.eventAggregator.publish('book-changed-' + this.temporaryBook.Id, this.temporaryBook);
            this.toggleEditMode();
        };

        EditBook.prototype.toggleEditMode = function toggleEditMode() {
            this.eventAggregator.publish('edit-mode-changed', !this.editMode);
        };

        EditBook.prototype.detached = function detached() {
            this.ratingElement.removeEventListener('change', this.ratingChangedListener);
        };

        _createClass(EditBook, [{
            key: 'canSave',
            get: function get() {
                return this.temporaryBook && !_lodash2.default.isEqual(this.temporaryBook, this.book);
            }
        }]);

        return EditBook;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'editMode', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'book', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, 'canSave', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'canSave'), _class2.prototype)), _class2)) || _class);
});
define('resources/elements/star-rating',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StarRating = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var StarRating = exports.StarRating = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function StarRating(element) {
            _classCallCheck(this, StarRating);

            _initDefineProp(this, 'rating', _descriptor, this);

            this.element = element;
            this.stars = [{ type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }];

            this.hovered = false;
        }

        StarRating.prototype.bind = function bind() {
            this.applyRating(this.rating);
        };

        StarRating.prototype.applyRating = function applyRating(rating) {
            var _this = this;

            this.stars.forEach(function (star, index) {
                return _this.rateStar(star, rating, index);
            });
        };

        StarRating.prototype.rateStar = function rateStar(star, rating, index) {

            if (index < rating) this.toggleOn(star);else {
                    this.toggleOff(star);
                }
        };

        StarRating.prototype.toggleOn = function toggleOn(star) {
            star.displayType = '';
            star.type = '';
            star.rated = true;
        };

        StarRating.prototype.toggleOff = function toggleOff(star) {
            star.displayType = '-o';
            star.type = '-o';
            star.rated = false;
        };

        StarRating.prototype.ratingFromIndex = function ratingFromIndex(index, star) {

            if (index === 0 && star.rated) return 0;

            return index + 1;
        };

        StarRating.prototype.rate = function rate(index) {

            var rating = this.ratingFromIndex(index, this.stars[0]);

            this.rating = rating;

            this.applyRating(rating);

            this.raiseChangedEvent();
        };

        StarRating.prototype.mouseOut = function mouseOut(hoverIndex) {

            if (!this.hovered) return;

            this.hovered = false;

            this.applyHoverState(hoverIndex);
        };

        StarRating.prototype.applyHoverState = function applyHoverState(hoverIndex) {
            var _this2 = this;

            this.stars.forEach(function (star, index) {
                if (!_this2.shouldApplyHover(index, hoverIndex, star)) return;

                if (_this2.hovered) {
                    _this2.toggleDisplayOn(star);
                } else {
                    _this2.toggleDisplayOff(star);
                }
            });
        };

        StarRating.prototype.mouseOver = function mouseOver(hoverIndex) {
            if (this.hovered) return;

            this.hovered = true;

            this.applyHoverState(hoverIndex);
        };

        StarRating.prototype.toggleDisplayOff = function toggleDisplayOff(star) {
            star.displayType = star.type;
        };

        StarRating.prototype.toggleDisplayOn = function toggleDisplayOn(star) {
            star.displayType = '';
        };

        StarRating.prototype.shouldApplyHover = function shouldApplyHover(starIndex, hoverIndex, star) {
            return starIndex <= hoverIndex && !star.rated;
        };

        StarRating.prototype.raiseChangedEvent = function raiseChangedEvent() {
            var changeEvent = {};
            if (window.CustomEvent) {
                changeEvent = new CustomEvent('change', {
                    detail: {
                        rating: this.rating
                    },
                    bubbles: true
                });
            } else {
                changeEvent = document.createEvent('CustomEvent');
                changeEvent.initCustomEvent('change', true, true, {
                    detail: {
                        rating: this.rating
                    }
                });
            }
            this.element.dispatchEvent(changeEvent);
        };

        return StarRating;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'rating', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/book-status',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var BookStatusValueConverter = exports.BookStatusValueConverter = function () {
        function BookStatusValueConverter() {
            _classCallCheck(this, BookStatusValueConverter);
        }

        BookStatusValueConverter.prototype.toView = function toView(value) {

            switch (value) {
                case 'bad':
                    return 'fa-frown-o';
                case 'good':
                    return 'fa-smile-o';
                case 'ok':
                    return 'fa-meh-o';
            }
        };

        return BookStatusValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      if (!value) return '';

      return (0, _moment2.default)(value).format('MM/DD/YYYY h:mm:ss a');
    };

    return DateFormatValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"font-awesome.css\"></require><require from=\"styles.css\"></require><div class=\"container\"><div class=\"header clearfix\"><h3 class=\"text-muted\"><span class=\"brand-highlight\">my </span>books</h3></div><router-view></router-view><footer class=\"footer\"><p>&copy; Aurelia Demo 2017</p></footer></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "/***********************************************************************************************************/\r\n/** Bootstrap theme specific CSS - Reference https://v4-alpha.getbootstrap.com/examples/narrow-jumbotron/ **/\r\n/***********************************************************************************************************/\r\n\r\n/* Space out content a bit */\r\nbody {\r\n  padding-top: 1.5rem;\r\n  padding-bottom: 1.5rem;\r\n}\r\n\r\n/* Everything but the jumbotron gets side spacing for mobile first views */\r\n.header,\r\n.footer {\r\n  padding-right: 1rem;\r\n  padding-left: 1rem;\r\n}\r\n\r\n/* Custom page header */\r\n.header {\r\n  padding-bottom: 1rem;\r\n  border-bottom: .05rem solid #e5e5e5;\r\n}\r\n\r\n/* Make the masthead heading the same height as the navigation */\r\n.header h3 {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  line-height: 3rem;\r\n}\r\n\r\n/* Custom page footer */\r\n.footer {\r\n  padding-top: 1.5rem;\r\n  color: #777;\r\n  border-top: .05rem solid #e5e5e5;\r\n}\r\n\r\n.container-narrow > hr {\r\n  margin: 2rem 0;\r\n}\r\n\r\n.jumbotron {\r\n  text-align: center;\r\n  border-bottom: .05rem solid #e5e5e5;\r\n}\r\n\r\n.jumbotron .btn {\r\n  padding: .75rem 1.5rem;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n\r\n/* Responsive: Portrait tablets and up */\r\n@media screen and (min-width: 48em) {\r\n  /* Remove the padding we set earlier */\r\n  .header,\r\n  .footer {\r\n    padding-right: 0;\r\n    padding-left: 0;\r\n  }\r\n  /* Space out the masthead */\r\n  .header {\r\n    margin-bottom: 2rem;\r\n  }\r\n  /* Remove the bottom border on the jumbotron for visual effect */\r\n  .jumbotron {\r\n    border-bottom: 0;\r\n  }\r\n}\r\n\r\n/***********************************************************************************************************/\r\n/** End Bootstrap theme specific CSS                                                                      **/\r\n/***********************************************************************************************************/\r\n\r\n/***********************************************************************************************************/\r\n/** Custom my-books CSS **/\r\n/***********************************************************************************************************/\r\nbody{\r\n  background-color:#f5f8fa;\r\n}\r\n\r\n/* Add box-shadow to jumbotron */\r\n.jumbotron{\r\n  background-color:white;\r\n  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\r\n}\r\n\r\n/* Add brand highlight color (theme) */\r\n.brand-highlight{\r\n  color:#2ecc71;\r\n}\r\n\r\n/* Add nav bar brand highlight color (theme) */\r\n.nav-pills .nav-item.show .nav-link, .nav-pills .nav-link.active {\r\n    color: #fff;\r\n    background-color: #27ae60;\r\n}\r\n\r\n/* Add brand button-success color (theme) */\r\n.btn-success{\r\n    background-color: #27ae60;\r\n}\r\n\r\n.btn-success:hover {\r\n    background-color: #2ecc71;\r\n}\r\n\r\n.btn-success:disabled{\r\n  background-color: #43bd99;\r\n}\r\n\r\n.btn-outline-success {\r\n    color: #27ae60;\r\n    border-color: #27ae60;\r\n}\r\n\r\n.btn-outline-success:hover{\r\n    color: white;\r\n    border-color: #27ae60;\r\n    background-color: #27ae60;\r\n}\r\n\r\n.cancel{\r\n  color:#d9534f;\r\n}\r\n\r\n.tap-right{\r\n  margin-left:10px;\r\n}\r\n\r\n.page-heading{\r\n  border-bottom: 2px solid #2ecc71;\r\n}\r\n\r\n/** Hover style button for font-awesome icons **/\r\n.remove-button{\r\n  color: rgba(70, 74, 76, 0.78);\r\n}\r\n\r\n.remove-button, .remove-button:hover{\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n}\r\n\r\n.remove-button:hover{\r\n    background-color: #eceeef;\r\n    cursor: pointer;\r\n    color: #292b2c;\r\n}\r\n\r\n/** Hide some content until we receive a hover event **/\r\n.hover-display{\r\n  display:none;\r\n}\r\n\r\n/** Read button state changes **/\r\n.read-button:hover, .edit-button:hover{\r\n  cursor:pointer;\r\n}\r\n\r\n.read-button:hover span.hover-display{\r\n  display:initial;\r\n}\r\n\r\n.read-button:disabled span.hover-display{\r\n  display:none;\r\n}\r\n\r\n/** Book list styles **/\r\nli.read-book{\r\n  border-left: 3px solid #2ecc71 !important;\r\n}\r\n\r\n.book-even{\r\n  background-color: #eceeef;;\r\n}\r\n\r\n/** Animations **/\r\n\r\n.books>li.au-enter {\r\n    opacity: 0!important;\r\n}\r\n\r\n.books>li.au-enter-active {\r\n    -webkit-animation: fadeIn 2s;\r\n    animation: fadeIn 2s;\r\n}\r\n\r\n.books>li.au-leave-active {\r\n    -webkit-animation: fadeOut 0.5s;\r\n    animation: fadeOut 0.5s;\r\n}\r\n\r\n@-webkit-keyframes fadeIn {\r\n    0%   { opacity: 0; }\r\n    100% { opacity: 1; }\r\n}\r\n\r\n@keyframes fadeIn {\r\n    0%   { opacity: 0; }\r\n    100% { opacity: 1; }\r\n}\r\n\r\n@-webkit-keyframes fadeOut {\r\n    0%   { opacity: 1; }\r\n    100% { opacity: 0; }\r\n}\r\n\r\n@keyframes fadeOut {\r\n    0%   { opacity: 1; }\r\n    100% { opacity: 0; }\r\n}\r\n\r\n.transformable {\r\n    -webkit-transition: height 100ms linear;\r\n    -moz-transition: height 100ms linear;\r\n    -o-transition: height 100ms linear;\r\n    -ms-transition: height 100ms linear;\r\n    transition: height 100ms linear;\r\n}\r\n\r\n/** End Animations **/\r\n\r\n/** edit-book panel styles **/\r\n.edit-book.hidden{\r\n  height: 0px;\r\n}\r\n\r\n.edit-book.hidden div.wrapper{\r\n  display: none;\r\n}\r\n\r\n.edit-book.visible{\r\n  height: 355px;\r\n  background-color: #eceeef;\r\n  padding-left: 40px;\r\n  padding-right: 40px;\r\n  padding-top: 20px;\r\n  margin-top: 15px;\r\n  margin-bottom: 15px;\r\n  border-top: 2px solid #ccc;\r\n}\r\n\r\n/** ratings component **/\r\nul.ratings li{\r\n  display: inline;\r\n  list-style-type: none;\r\n  padding-right: 20px;\r\n}\r\n\r\n.star:hover{\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n}\r\n\r\n.star.rated{\r\n  color:rgb(255, 204, 0);\r\n\r\n}\r\n\r\n.padded{\r\n  margin-right:3px;\r\n}"; });
define('text!index.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><h1 class=\"display-3\"><span class=\"brand-highlight\">my</span> Books</h1><p class=\"lead\">My-Books allows you to keep track of the books you've read by adding and rating them as you read.</p><a route-href=\"route: books;\">books</a></div><div class=\"row\"><div class=\"col-lg-12\"><p></p></div></div></template>"; });
define('text!resources/elements/book-container.html', ['module'], function(module) { module.exports = "<template><require from=\"./book\"></require><li class=\"${book.read ? 'read-book' : ''} list-group-item au-animate\" anim-enter=\"slideRightBigIn;{duration:2000}\"><book containerless book.bind=\"book\"></book></li></template>"; });
define('text!resources/elements/book-list.html', ['module'], function(module) { module.exports = "<template><require from=\"../attributes/tooltip\"></require><require from=\"./book\"></require><ul class=\"books list-group list-group-flush\"><book containerless repeat.for=\"book of books\" book.bind=\"book\"></book></ul></template>"; });
define('text!resources/elements/book-stats.html', ['module'], function(module) { module.exports = "<template><div class=\"card text-center\"><div class=\"card-block\"><p class=\"card-text\"><span show.bind=\"addedBooks\" class=\"badge badge-primary\">new books ${addedBooks}</span></p></div><div class=\"card-footer text-muted\">Book Stats</div></div></template>"; });
define('text!resources/elements/book.html', ['module'], function(module) { module.exports = "<template><require from=\"./edit-book\"></require><require from=\"../value-converters/book-status\"></require><li class=\"${book.read ? 'read-book' : ''} list-group-item au-animate\" anim-enter=\"slideRightBigIn;{duration:2000}\"><div class=\"book col-12\"><div class=\"book-options form-inline\"><div class=\"col-lg-7 col-md-2\">${book.title}</div><div class=\"col-lg-3 col-md-5\"><button class=\"read-button btn btn-success btn-sm\" if.bind=\"!book.readDate\" click.delegate=\"markRead(event)\"><span class=\"hover-display\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> </span>mark read</button> <button class=\"btn btn-secondary btn-sm edit-button\" click.delegate=\"toggleEditMode()\" disabled.bind=\"editMode\">edit</button></div><span class=\"col-1\"><i class=\"fa ${book.status | bookStatus}\" aria-hidden=\"true\"></i></span><div class=\"col-1\"><span class=\"remove-button\" click.delegate=\"removeBook($index)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></div></div><edit-book book.bind=\"book\" containerless edit-mode.bind=\"editMode\"></edit-book></div></li></template>"; });
define('text!resources/elements/books.html', ['module'], function(module) { module.exports = "<template><require from=\"./book-list\"></require><require from=\"./heading.html\"></require><heading text.bind=\"'books'\"></heading><div class=\"card\"><div class=\"card-block\"><form class=\"form-inline\" submit.trigger=\"addBook()\"><label for=\"book-title\"></label><input class=\"form-control\" value.bind=\"bookTitle\" id=\"book-title\" type=\"text\"> <input class=\"btn btn-success tap-right\" type=\"submit\" value=\"add\" disabled.one-way=\"canAdd\"></form></div></div><hr><book-list books.bind=\"books\"></book-list></template>"; });
define('text!resources/elements/edit-book.html', ['module'], function(module) { module.exports = "<template><require from=\"./star-rating\"></require><require from=\"../value-converters/date-format\"></require><div ref=\"editFormDiv\" class=\"edit-book ${editMode ? 'visible': 'hidden'} transformable\"><div class=\"wrapper\"><div class=\"row\"><span class=\"col-3 offset-md-10\"><small class=\"text-muted\">${book.readDate | dateFormat}</small></span></div><form><div class=\"form-group row\"><label for=\"title\">Title</label><input type=\"text\" class=\"form-control\" id=\"title\" value.bind=\"temporaryBook.title\" placeholder=\"book title\"></div><div class=\"form-group row\"><label for=\"description\">Description</label><textarea class=\"form-control\" id=\"description\" value.bind=\"temporaryBook.description\" placeholder=\"book description\"></textarea></div><hr><star-rating view-model.ref=\"starRatingViewModel\" ref=\"ratingElement\" rating.bind=\"temporaryBook.rating\"></star-rating><hr><div class=\"form-inline col-3 offset-lg-10 col-sm-12\"><div class=\"custom-control\" show.bind=\"loading\"><i class=\"fa fa-spinner fa-pulse fa-fw\"></i> <span class=\"sr-only\">Loading...</span></div><div class=\"custom-control brand-highlight\" show.bind=\"saved\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></div><button class=\"btn btn-secondary btn-sm padded\" click.delegate=\"save()\" disabled.bind=\"!canSave\">save</button> <button class=\"btn btn-secondary btn-sm\" click.delegate=\"cancel()\"><span class=\"cancel\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i> </span>cancel</button></div></form></div></div></template>"; });
define('text!resources/elements/heading.html', ['module'], function(module) { module.exports = "<template bindable=\"text\"><h1 class=\"page-heading\">${text}</h1></template>"; });
define('text!resources/elements/star-rating.html', ['module'], function(module) { module.exports = "<template><ul class=\"ratings\"><li repeat.for=\"star of stars\" click.delegate=\"rate($index)\" mouseover.delegate=\"mouseOver($index) & debounce:100\" mouseout.delegate=\"mouseOut($index)   & debounce:100\"><span class=\"star ${star.displayType === '' ? 'rated' : ''}\"><i class=\"fa fa-star${star.displayType}\" aria-hidden=\"true\"></i></span></li></ul></template>"; });
//# sourceMappingURL=app-bundle.js.map