class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
          <p>Copyright © 2024 - Restau-Run. All Rights Reserved</p>
        </footer>
    `;
  }
}

customElements.define("footer-element", FooterElement);
