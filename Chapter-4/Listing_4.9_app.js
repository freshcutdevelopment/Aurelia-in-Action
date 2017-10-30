export class App {
    constructor(){
      this.greeting = 'Hello'; 
      
      setTimeout(x => { 
        this.greeting = 'hello from the future!'; 
      },2000);
    } 
  }
  