import { LitElement, html, css } from "lit";

class FetchingData extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                gap: 2rem;
            }

            .list {
                color: red;
            }
        `;
    }

    static get properties() {
        return {
            response: { type: Array },
        };
    }

    constructor() {
        super();
        this.response = [];
    }

    async firstUpdated() {

        const url = 'https://swapi.dev/api/people/';
        const results = await fetch(url);
        const data = await results.json();

        this.response = data.results;
    }

    render() {
        const { response } = this;
        return html`
            <h3>Start Ward</h3>
            <ul>
                ${response.map(
                    item => html`
                        <li class="list">${item.name}</li>
                    `
                )}
            </ul>
        `;
    }
}

customElements.define('fetching-data', FetchingData);