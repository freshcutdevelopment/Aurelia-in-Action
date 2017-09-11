customElements.define('x-info-card', 
     class XInfoCard extends HTMLElement {
      static get observedAttributes() {return ['message']; }

       attributeChangedCallback(attr, oldValue, newValue) {
         if (attr == 'message') {
           this.textContent = newValue;
         }
      }
  });
