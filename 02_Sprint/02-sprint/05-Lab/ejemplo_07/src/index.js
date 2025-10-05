import { LitElement, html } from "lit";


function getMessage(message, showMessage) {
    if (!showMessage) {
        return "";
    }

    return `Message from function: ${message}`;
}

class ConditionalRendering extends LitElement {

    static get properties() {
        return {
            showMessage: { type: Boolean },
            message: { type: String },
            disabled: { type: Boolean }
        };
    }

    render() {

        if (this.disabled) {
            return html`
                Nothing to see here
            `;
        }

        return html`
            <div>
                <button @click=${() => (this.showMessage = !this.showMessage)}>
                    Click to ${this.showMessage ? "hide" : "show"} message
                </button>

                <div>
                    ${this.showMessage
                        ? html`
                            The message is: ${this.message}
                        `
                        : ""
                    }
                </div>

                <div>
                    ${getMessage(this.message, this.showMessage)}
                </div>
            </div>
        `;
    }
}

customElements.define('conditional-rendering', ConditionalRendering);