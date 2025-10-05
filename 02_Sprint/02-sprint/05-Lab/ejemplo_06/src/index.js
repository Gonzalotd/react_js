import { LitElement, html } from "lit";

class HandleEvents extends LitElement {
    static get properties() {
        return {
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
                <button @click=${() => (this.count += 1)}>+</button>
                <span>Current cout => ${this.count}</span>
                <button @click=${this._onDecrement}>-</button>
            </div>
        `;
    }

    _onDecrement() {
        this.count -= 1;
    }
}

customElements.define('handle-events', HandleEvents);