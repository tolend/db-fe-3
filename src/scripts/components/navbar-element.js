class NavbarElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="header">
        <div class="header_inner">
          <h1 class="header_title">Restau-Run</h1>
        </div>
        <button id="menu" class="header_menu">☰</button>
        <nav id="drawer" class="nav">
          <ul class="nav_list">
            <li class="nav_item"><a href="/">Home</a></li>
            <li class="nav_item"><a href="#/favorite">Favorites</a></li>
            <li class="nav_item"><a href="https://github.com/endrialmp" target="_blank">About Us</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("navbar-element", NavbarElement);
