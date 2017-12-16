import { useShadowDOM, bindable } from "aurelia-framework";

@useShadowDOM()
export class UxTextArea {
  @bindable textContent;
  @bindable rows;

  constructor() {
    this.editMode = false;
  }

  bind(){
      this.textContentTemp = this.textContent;
  }

  edit() {
    this.editMode = true;

    setTimeout(_ => {
      this.element.focus();
    }, 1);
  }

  ok() {
    this.editMode = false;
    this.textContent = this.textContentTemp;
  }

  cancel() {
    this.editMode = false;
    this.textContentTemp = this.textContent;
  }
}
