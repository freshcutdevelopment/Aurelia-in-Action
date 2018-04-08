import 'bootstrap';

export class App {
  configureRouter(config, router) {
  this.router = router;
  config.title = 'my-books';
  config.map([ 
   { route: ['', 'home'], name: 'home', moduleId: 'index' },
   { route: 'books', name: 'books', moduleId: './resources/elements/books'},
  ]);
  }
}