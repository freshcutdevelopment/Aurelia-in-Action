import {bindable, useShadowDOM} from 'aurelia-framework';

@useShadowDOM()
export class UxThumbnailImage{
    @bindable imgSrc;
    @bindable imgHref;
    @bindable imgCap;
    @bindable positionAbsolute = false;

}