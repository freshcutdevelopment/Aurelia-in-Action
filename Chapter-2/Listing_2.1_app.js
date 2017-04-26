export class App {
 
   constructor(){
    this.books = [];
    this.bookTitle = ""; 
  }

  addBook () { 
    this.books.push({Title : this.bookTitle});
    this.bookTitle = "";
    console.log("Book List ", this.books);
  }

}