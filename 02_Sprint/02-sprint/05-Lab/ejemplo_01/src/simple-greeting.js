import {LitElement, html, css} from 'lit';

export class SimpleGreeting extends LitElement {
    static styles = css`
        :host {
            display: block;
            background-color: gray;
            color: white;
            padding: 8px;
        }
        :host(.blue) {
            background-color: aliceblue;
            color: darkgreen;
        }
    `;

    render() {
        return html`Hello World`;
    }

}

customElements.define('simple-greeting', SimpleGreeting);