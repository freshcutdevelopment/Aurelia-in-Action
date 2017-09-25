import {bindable, useShadowDOM} from 'aurelia-framework';

@useShadowDOM()
export class UxTags{
    @bindable tags;
}