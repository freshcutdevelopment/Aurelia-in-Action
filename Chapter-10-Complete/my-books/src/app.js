import {AuthService} from './services/auth-service';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AuthorizeStep} from './router-steps/authorization-step';

@inject(AuthService, HttpClient)
export class App {

    constructor(authService, http){
      this.authService = authService;

        const baseUrl = 'http://localhost:8333/api/';

        http.configure(config => {
            config.withBaseUrl(baseUrl)
                  .withInterceptor({
                  request(request) {
                    let token = window.localStorage.getItem("token");
                    if(token){
                        request.headers.append('authorization', `bearer ${token}`);
                    }
                    return request; 
                  }
                });
        });
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