import {AuthService} from './services/auth-service';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class App {

    constructor(authService){
      this.authService = authService;
    }

    configureRouter(config, router) {
    this.router = router;
    config.title = 'My-Books';

    var handleUnknownRoutes = (instruction) => {

      let path = instruction.fragment.toLowerCase(); 

      if(path.includes('admin')) return './resources/elements/admin-unknown-route.html'

      return './resources/elements/what-happened.html';
    }

    let step = new AuthorizeStep(this.authService);

    config.addAuthorizeStep(step)

    config.map([ 
      { 
        route: ['', 'home'], 
        name: 'home',
        moduleId: 'index', 
        title:'home', 
        nav:true, 
        settings: {icon:'home', auth:true}, 
        layoutViewModel: 'main-layout'
      },
      { 
        route: 'books', 
        name: 'books', 
        moduleId: './resources/elements/books', 
        title:'books', nav:true, 
        settings: {icon:'book', auth:true},  
        layoutViewModel: 'main-layout'
      },
      { 
        route: 'users', 
        name: 'users', 
        moduleId: './resources/elements/users', 
        title:'users', 
        nav:true, 
        settings: {icon:'users', auth:true}, 
        layoutViewModel: 'main-layout'
      },
      { 
        route: 'users/:name/details', 
        name: 'user-detail', 
        moduleId: './resources/elements/user-details', 
        title:'user details', 
        settings: { auth:true }, 
        layoutViewModel: 'main-layout'
      },
      { 
        route: 'login', 
        name: 'login', 
        moduleId: './resources/elements/login', 
        title:'login',   
        layoutView: 'login-layout.html'
      },
      { 
        route: 'legacy-users', redirect: 'users'
      }
    ]);

    config.mapUnknownRoutes(handleUnknownRoutes);
  }
}

class AuthorizeStep {

  constructor(authService){
    this.authService = authService;
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      
      if (!this.authService.isLoggedIn()) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}