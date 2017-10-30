import {inject, bindable, DOM} from 'aurelia-framework';

@inject(Element) // Inject the instance of this element
export class StarRating{
    
    @bindable rating;

    constructor(element){

        this.element = element;
        this.stars = [
                        { type: '-o', displayType: '-o', rated : false },
                        { type: '-o', displayType: '-o', rated : false },
                        { type: '-o', displayType: '-o', rated : false },
                        { type: '-o', displayType: '-o', rated : false },
                        { type: '-o', displayType: '-o', rated : false }
                    ];

        this.hovered = false;
    }

    bind(){
        this.applyRating(this.rating);
    }

    applyRating(rating){
        this.stars.forEach((star, index) => 
                            this.rateStar(star, rating, index));
    }

    rateStar(star, rating, index){
 
        if(index < rating) this.toggleOn(star);
        else {
            this.toggleOff(star);
        }
        
    }

    toggleOn(star){
        star.displayType = '';
        star.type = '';
        star.rated = true;
    }

    toggleOff(star){
        star.displayType = '-o';
        star.type = '-o';
        star.rated = false;
    }

    ratingFromIndex(index, star){

        if(index === 0 && star.rated) return 0;

        return index + 1;

    }

    rate(index){

        let rating = this.ratingFromIndex(index, this.stars[0]);

        this.rating = rating;
        
        this.applyRating(rating);
        
        this.raiseChangedEvent();

    }

    mouseOut(hoverIndex){
        
        if(!this.hovered) return;

        this.hovered = false;

        this.applyHoverState(hoverIndex);
       
    }

    applyHoverState(hoverIndex){
         this.stars.forEach((star, index) =>{
            if(!this.shouldApplyHover(index, hoverIndex, star)) return;

            if(this.hovered){
                this.toggleDisplayOn(star);
            }
            else{
                 this.toggleDisplayOff(star);
            }
        }); 
    }

    mouseOver(hoverIndex){
        if(this.hovered) return;

        this.hovered = true;

        this.applyHoverState(hoverIndex);
    }

    toggleDisplayOff(star){
        star.displayType = star.type; 
    }

    toggleDisplayOn(star){
        star.displayType = '';
    }

    shouldApplyHover(starIndex, hoverIndex, star){
        return starIndex <= hoverIndex && !star.rated;
    }

    raiseChangedEvent(){
        let changeEvent = DOM.createCustomEvent('change', {detail : {rating: this.rating}});
        this.element.dispatchEvent(changeEvent);
    }
}