import { LitElement, html, css } from "lit";

export class PropertiesChange extends LitElement {

    static get properties() {
        return {
            count: { type: Number }
        }
    };

    constructor() {
        super();
        this.count = 0;

        setInterval(() => {
            this.count = this.count < 10 ? this.count + 1 : 0;
        }, 2000);
    }

    render() {
        return html`
            <div>
                Count from 0 to 10: [${this.count}]
            </div>
        `;
    }


}

customElements.define('properties-change', PropertiesChange);