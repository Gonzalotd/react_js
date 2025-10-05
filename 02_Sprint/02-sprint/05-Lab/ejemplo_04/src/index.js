import { LitElement, html, css } from "lit";

const messagePrefix = "The message is: ";

export class PropertiesAndAttribute extends LitElement {

    static get properties() {
        return {
            href: { type: String},
            label: { type: String },
            message: { type: String },
            checked: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.href = "https://www.google.es";
        this.label = "Open link";
        this.checked = true;
    }

    render() {
        return html`
            <input type="checkbox" ?checked=${this.checked} /> 
            <a href="${this.href}">
                ${this.label}
            </a>

            <fancy-message .messagePrefix=${messagePrefix} .message=${this.message}></fancy-message>

            <fancy-message messageprefix="The message is: " .message=${this.message}></fancy-message>

        `;
    }
}

customElements.define('properties-atributes', PropertiesAndAttribute);

class FancyMessage extends LitElement {
    static get properties() {
        return {
            message: { type: String },
            messagePrefix: { type: String }
        };
    }

    render () {
        return html`
            <div>
                ${this.messagePrefix}${this.message}
            </div>
        `;
    }
}

customElements.define("fancy-message", FancyMessage);