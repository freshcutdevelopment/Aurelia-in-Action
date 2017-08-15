import {bindable, inject, computedFrom, NewInstance} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BootstrapFormRenderer} from '../../renderers/bootstrap-form-renderer';
import {ValidationRules, ValidationController} from 'aurelia-validation';
import _ from 'lodash';

@inject(EventAggregator, NewInstance.of(ValidationController) )
export class EditBook{
    
    @bindable editMode;
    @bindable book;
    @bindable selectedGenre;
    @bindable genres;
    @bindable shelves;
    temporaryBook = new Book();

    constructor(eventAggregator,  validationController ){
        
        this.validationController = validationController;
        this.validationController.addRenderer(new BootstrapFormRenderer());
        this.eventAggregator = eventAggregator;
        this.ratingChangedListener =  e => this.temporaryBook.rating = e.rating;
        this.editingShelves = false;
        this.saved = false;

    }

    bind(){
        this.resetTempBook();
        this.ratingElement.addEventListener("change", this.ratingChangedListener);
        this.selectedShelves = this.shelves.filter(shelf => this.temporaryBook.shelves.indexOf(shelf) !== -1);
        this.selectedGenre = this.genres.find(g => g.id == this.book.genre);
    }

    selectedGenreChanged(newValue, oldValue){
        if(!newValue) return;
        this.temporaryBook.genre = newValue.id;
    }

    attached(){
        this.bookSaveCompleteSubscription = 
            this.eventAggregator
            .subscribe(`book-save-complete-${this.book.Id}`, 
                        () =>  this.bookSaveComplete());
    }

    editModeChanged(editModeNew, editModeOld){
        if(editModeNew) this.resetTempBook();
    }

    @computedFrom('temporaryBook.title', 
                  'temporaryBook.description', 
                  'temporaryBook.rating', 
                  'temporaryBook.ownACopy', 
                  'temporaryBook.genre', 
                  'saved', 
                  'temporaryBook.shelves',
                  'temporaryBook.timesRead')
    get canSave(){
        if(!this.temporaryBook.Id) return false;
        
        return this.isDirty();
    }

    isDirty(){
     
        let differences = [];
        _.forOwn(this.temporaryBook, (value, key) => {
            return differences.push({different : this.book[key] != value, key : key} ); 
        });

        return differences.filter(d => d.different).length > 0;
    }

    resetTempBook(){
        Object.assign(this.temporaryBook, this.book);
    }

    cancel(){
        let book = Object.assign(new Book(), this.book);
        this.temporaryBook = book;
        this.starRatingViewModel.applyRating(this.temporaryBook.rating);
        this.toggleEditMode();
    }
    
    save(){
        this.validationController.validate()
                        .then(result => {
                            if (result.valid) {
                                this.loading = true;
                                this.publishBookSavedEvent();
                            } 
                        });
    }

    toggleEditShelves(){
        this.editingShelves = !this.editingShelves;
    }

    unToggleEditShelves(){
        this.temporaryBook.shelves = this.selectedShelves;
        this.editingShelves = !this.editingShelves;
    }

    bookSaveComplete(){
        this.loading = false;
        this.saved = true;
        Object.assign(this.book, this.temporaryBook);

        setTimeout(() => {
           this.saved = false;
           this.toggleEditMode();  
        }, 500);  
    }

    publishBookSavedEvent(){
        this.eventAggregator.publish('save-book', this.temporaryBook);
    }

    toggleEditMode(){
        this.saved = false;
        this.eventAggregator.publish('edit-mode-changed', !this.editMode );
    }

    detached(){
        this.ratingElement.removeEventListener('change', this.ratingChangedListener);
        this.bookSaveCompleteSubscription.dispose();
    }
}

export class Book {
  title='';
  description='';
  timesRead = 0;
}

ValidationRules.customRule(
  'zeroOrPositiveInteger',
  (value, obj) => value === null || value === undefined 
    || (Number.isInteger(value) || value >= 0),
  `Books can only be read 0 or more times.` 
);

ValidationRules
  .ensure(a => a.title).required()
  .ensure('timesRead')
  .required()
  .satisfiesRule('zeroOrPositiveInteger')
  .on(Book);
