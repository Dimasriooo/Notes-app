class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
        <div class="loader">
          <div class="spinner"></div>
          <p>Memuat...</p>
        </div>
      `;
    }
  
    show() {
      this.classList.remove('hidden');
    }
  
    hide() {
      this.classList.add('hidden');
    }
  }
  
  customElements.define('loading-indicator', LoadingIndicator);