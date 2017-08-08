import {AuthService} from '../../services/auth-service';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class AuthFilterValueConverter {
  
  constructor(authService){
    this.authService = authService;
  } 

  toView(routes) {
    
    let isAuthenticated = this.authService.isLoggedIn();
    let isAdmin = isAuthenticated && this.authService.getUser().admin;

    return routes.filter(r => r.settings.auth === undefined 
                        || (r.settings.auth === isAuthenticated 
                            && (!r.settings.admin || isAdmin)));
  }
}