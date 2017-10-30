import { inject } from "aurelia-framework";

@inject(Element)
export class TooltipCustomAttribute {
  
  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.element).tooltip({ title: this.value });
  }

  detached() {
    $(this.element).tooltip("dispose");
  }
}
