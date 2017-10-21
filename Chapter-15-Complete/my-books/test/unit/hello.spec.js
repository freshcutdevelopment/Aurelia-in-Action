import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('Hello element', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('./resources/elements/hello')
      .inView('<hello greeting.bind="message"></hello>')
      .boundTo({ message: 'Hello brave world!' });
  });

  it('should show a greeting', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('h1');
      expect(nameElement.innerHTML).toBe('Hello brave world!');
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});