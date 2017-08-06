import {inject} from 'aurelia-framework';
import {AuthService} from '../../services/auth-service';
import {Router} from 'aurelia-router';

@inject(Router,AuthService)
export class NavBar{

    constructor(router, authService){
        this.authService = authService;
        this.router = router;
    }

    logOut(){
       this.authService.logOut();
       this.router.navigateToRoute('login');
    }
}