class HelloWord extends HTMLElement {

    constructor() {
        super();
        this.name ="World";
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if ( oldValue === newValue) return;
        this[ property ] = newValue;
    }

    connectedCallback() {
        this.textContent = `Hello ${ this.name }!`;
    }
}

customElements.define ( 'hello-world', HelloWord);