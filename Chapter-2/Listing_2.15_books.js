export class Books {
  constructor(){
    this.bookTitle = ""; 
    this.books = [];
  }
  
  addBook () {
    this.books.push({title : this.bookTitle});
    this.bookTitle = "";
  }
}