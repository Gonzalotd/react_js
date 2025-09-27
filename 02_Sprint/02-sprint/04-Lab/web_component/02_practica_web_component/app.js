class MyButton extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', this.handleClick);
    }
  
    connectedCallback() {
      this.textContent = 'Haz clic en mí';
      this.style.padding = '10px 20px';
      this.style.background = 'red';
      this.style.color = 'white';
      this.style.border = 'none';
      this.style.borderRadius = '5px';
      this.style.cursor = 'pointer';
    }
  
    handleClick = () => {
      alert('¡Botón clickeado!');
    }
  }
  
  customElements.define('my-button', MyButton);