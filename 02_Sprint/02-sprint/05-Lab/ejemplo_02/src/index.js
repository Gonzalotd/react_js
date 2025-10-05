import { LitElement, html, css } from "lit";

export class ManageProperties extends LitElement {

    static get properties() {
        return {
            message: { type: String },
            count: { type: Number }
        };
    }

    constructor() {
        super();
        this.count = 0;
    }

    render() {
        return html`
            <div>
                <div>
                    The message is: ${this.message}, count is: ${this.count}
                </div>
                <div>
                    The reversed message is: ${this.reverseMessage(this.message)}
                </div>
            </div>
        `;
    }

    reverseMessage(message) {
        return message
            .split("")
            .reverse()
            .join("");
    }
}

customElements.define('manage-properties', ManageProperties);