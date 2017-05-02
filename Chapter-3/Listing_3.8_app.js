export class App {
   configureRouter(config, router) {
    this.router = router;
    config.title = 'My-Books';
    config.map([
      { route: ['', 'home'],  name: 'home', moduleId: 'index', nav:true, title : 'home' },
      { route: 'books' ,name: 'books', moduleId: './resources/elements/books', nav: true, title : 'books' },
    ]);
   }
}