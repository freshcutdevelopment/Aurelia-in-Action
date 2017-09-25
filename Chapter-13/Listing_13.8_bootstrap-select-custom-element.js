import {customElement, bindable} from 'aurelia-framework';

@customElement('select-custom-element')
export class BootstrapSelectCustomElement{
  @bindable options;
}