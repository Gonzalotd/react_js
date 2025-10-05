import { LitElement, html } from "lit";

class FirstUpdate extends LitElement {

    render() {
        return html`
            <form id="form">
                Auto focusses: <input id="amountInput" type="number" name="amount" />
                <button>Submit button</button>
            </form>
        `;
    }

    firstUpdated(changedProperties) {
        this._form = this.shadowRoot.getElementById("form");
        this.shadowRoot.getElementById("amountInput").focus();
    }

    submitForm() {
        return this._form.submit();
    }
}

customElements.define('first-update', FirstUpdate);