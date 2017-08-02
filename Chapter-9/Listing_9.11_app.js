export class App {
  
  configureRouter(config, router) {
    this.router = router;
    this.config = config;

    config.title = 'Custom Navigation Example';
    config.customer = 'b'; 
  
    config.map([{ 
        route: ['', 'home'],       
        name: 'home',       
        moduleId: 'home' , 
        nav:true
      },
      { 
        route: [ 'customer'],   
        name: 'customer',  
        navigationStrategy: this.customNavigationStrategy
      }
    ]);
  }
  
  customNavigationStrategy = (instruction) => {
      instruction.config.moduleId = `customer-${this.config.customer}`;
  }
}
