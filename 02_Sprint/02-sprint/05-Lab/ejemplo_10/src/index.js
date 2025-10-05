import { LitElement, html, css } from "lit";

class RenderStyles extends LitElement {
    
    static get styles() {
        return css`
            :host {
                display: block;
            }

            .message {
                color: red;
            }

            .message:hover {
                color: green;
            }
        `;
    }

    render() {
        return html`
            <div class="message">
                Hello Lit
            </div>
        `;
    }
}

customElements.define('render-styles', RenderStyles);