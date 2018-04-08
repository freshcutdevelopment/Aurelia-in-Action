import 'bootstrap';

export class App {
  configureRouter(config, router) {
  this.router = router;
  config.title = 'my-books';
  config.map([ 
   { route: ['', 'home'], name: 'home', moduleId: 'index', title:'home', nav:true , settings: {icon:'home'}},
   { route: 'books', name: 'books', moduleId: './resources/elements/books', title:'books', nav:true, settings: {icon:'book'}},
  ]);
  }
}