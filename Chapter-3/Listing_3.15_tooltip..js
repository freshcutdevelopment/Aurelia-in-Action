import { inject } from "aurelia-framework";

@inject(Element)
export class TooltipCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.element).tooltip();
  }

  detached() {
    $(this.element).tooltip("dispose");
  }
}
