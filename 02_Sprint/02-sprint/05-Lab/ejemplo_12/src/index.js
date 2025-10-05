import { LitElement, html, css } from "lit";

class FireEventsParent extends LitElement {

    someCallback(event) {
        console.log("Event:", event.detail);
    }

    render() {
        return html`
            <fire-events-child @event-fired=${this.someCallback}></fire-events-child>
        `;
    }
}

class FireEventsChild extends LitElement {

    handleClick() {
        this.dispatchEvent(new CustomEvent("event-fired", { detail: 1}));
    }

    render() {
        return html`
            <button @click=${this.handleClick}>clickity</button>
        `;
    }
}

customElements.define('firing-events', FireEventsParent);
customElements.define('fire-events-child', FireEventsChild);