import { StageComponent, waitForElement } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import { TestHelper } from "./test-helper";

describe("UxTextArea", () => {
  let component;

  beforeEach(() => {
    component = StageComponent.withResources(
      "./resources/attributes/tooltip"
    )
      .inView(
        `<button id="el" tooltip="title.bind:'Remove book from list'; placement.bind:'top'"> </button>`
      );
  });

  function hoverOverElement(){
    let button = document.querySelector('button');
    
    return TestHelper.fireJQueryEventAndWait("#el", 'mouseenter');
  }

  it("tooltip is shown on hover", done => {
    component
      .create(bootstrap)
      .then(() => {
        
        hoverOverElement().then(_ => {

          let toolTip = document.querySelector('.tooltip');
          expect(toolTip).not.toBe(null);
          done();

        });

      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  afterEach(() => {
    component.dispose();
  });
});
