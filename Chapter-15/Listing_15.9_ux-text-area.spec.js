import { StageComponent, waitForElement } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import TestData from "./test-data";
import { TestHelper } from "./test-helper";

describe("UxTextArea", () => {
  let component;
  let bookDescription = TestData.Books.Oliver.description;

  beforeEach(() => {
    component = StageComponent.withResources(
      "./resources/components/ux-text-area"
    )
      .inView(
        `<ux-text-area 
                text-content.bind="description">
               </ux-text-area>`
      )
      .boundTo({ description: bookDescription });
  });

  function getTextAreaElement(){
    return TestHelper.shadowRoot("ux-text-area");
  }

  function getTextBlockElement(){
    return TestHelper.shadowRoot("ux-text-area")
                     .querySelector(".text-block");
  }

  function clickOkButton(){
    let okButton = TestHelper.shadowRoot("ux-text-area")
                             .querySelector("button.ok");
    return TestHelper.clickAndWait(okButton);
  }

  function changeTextAreaValue(value){
    let componentElement = getTextAreaElement()
    let textArea = componentElement.querySelector('textarea');
    textArea.value = value;
    let event = new Event('change');

    textArea.dispatchEvent(event);
  }

  function editText(){
    return TestHelper.clickAndWait(getTextBlockElement());
  }

  it("should initialize component with a text-box", done => {
    component
      .create(bootstrap)
      .then(() => {
        let actualDescription = getTextBlockElement().innerHTML;

        expect(bookDescription).toBe(actualDescription);
        done();
      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  it("transitions to a text-area once clicked", done => {
    component
      .create(bootstrap)
      .then(() => {

        editText().then(_ => {

        let actualDescription = getTextAreaElement()
                                .querySelector('textarea')
                                .value;

            expect(bookDescription).toBe(actualDescription);
            done();
        });    

      })
      .catch(e => {
        console.log(e.toString());
      });
  }); 
});
