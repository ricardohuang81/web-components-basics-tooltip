class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if(!confirm('Do you really wanna leave?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('rh-confirm-link', ConfirmLink, { extends: 'a' });