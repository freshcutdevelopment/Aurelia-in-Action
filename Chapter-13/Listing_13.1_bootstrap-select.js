import {useView, bindable} from 'aurelia-framework';

@useView('./my-select.html')
export class BootstrapSelect{
  @bindable options;
}