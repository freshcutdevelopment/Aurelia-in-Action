# Aurelia-in-Action
This repository includes the source code listings for the book Aurelia in Action. The book is currently available under the Manning early access program: https://www.manning.com/books/aurelia-in-action. 

This is a work in progress. As such, any feedback that you can give is extremely valuable. You can provide feedback on the source code, or the book itself on the book forum https://forums.manning.com/forums/aurelia-in-action or by submitting a Github issue.

## How to use this repository
This repository consists of code listings and completed chapter snapshots. Both of these resources can be useful in different ways when following along with the my-books example application.

### Code Listings
There is a directory for each chapter in the book which contains the full code listing files corresponding to each code listing in that chapter. Each code listing is named according to the file that the listing corresponds to. For example, the listing `Chapter-2/Listing_2.1_app.js` contains the first code listing for chapter 2, and relates to changes that need to be made to the `app.js` file ViewModel file. These listings are useful if you want to copy and paste an entire listing file, rather than manually making each edit described in the chapter. These code listings are also available from manning website. https://manning-content.s3.amazonaws.com/download/4/33a24a0-d7ae-402a-8d34-ed54610dfd3b/source-code.zip.

### Completed Chapter Snapshots
There is a completed chapter snapshot directory from chapter 2 onwards. This contains the my-books sample project with the changes snapshotted at that chapter. This is useful if you want to re-set your project after experimenting with changes, or if you just want to skip to a certain point. You can use these snapshots by following the below steps:

1. Check out the entire repository `git clone https://github.com/freshcutdevelopment/Aurelia-in-Action.git`
2. Change directory to the my-books project sub-directory of the chapter you wish to jump to `cd Chapter-2-Complete/my-books`
3. Install the NPM dependences `npm install`
4. Run the project using the Aurelia CLI `au run --watch`