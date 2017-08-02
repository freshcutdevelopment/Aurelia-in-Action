export class App {
    configureRouter(config, router) {
    this.router = router;
    config.title = 'My-Books';

    var handleUnknownRoutes = (instruction) => {

      let path = instruction.fragment.toLowerCase(); 

      if(path.includes('admin')) return './resources/elements/admin-unknown-route.html'

      return './resources/elements/what-happened.html';
    }

    config.map([ 
      { route: ['', 'home'], name: 'home', moduleId: 'index', title:'home', nav:true, settings: {icon:'home'} },
      { route: 'books', name: 'books', moduleId: './resources/elements/books', title:'books', nav:true, settings: {icon:'book'}},
      { route: 'users', name: 'users', moduleId: './resources/elements/users', title:'users', nav:true, settings: {icon:'users'}},
      { route: 'users/:name/details', name: 'user-detail', moduleId: './resources/elements/user-details', title:'user details'},
      { route: 'legacy-users', redirect: 'users'}
    ]);

    config.mapUnknownRoutes(handleUnknownRoutes);
  }
}