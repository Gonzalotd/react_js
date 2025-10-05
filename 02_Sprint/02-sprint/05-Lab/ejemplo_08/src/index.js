import { LitElement, html } from "lit";

class RepeatedTemplate extends LitElement {

    static get properties() {
        return {
            books: { type: Array }
        };
    }

    constructor() {
        super();

        this.books = [
            { author: "G.R.R. Martin", title: "A Game of Thrones" },
            { author: "Tolkien", title: "Lord of the Rings" }
        ]
    }

    render() {
        return html`
            Books:
            <ul>
                ${this.books.map(
                    book => html`
                        <li>${book.author}: ${book.title}</li>
                    `
                )}
            </ul>

            Others:
            <br/>
            Books:
            <ul>
                ${this.books.map(this._bookTemplate)}
            </ul>
        `;
    }

    _bookTemplate(book) {
        return html`
            <li>${book.author}: ${book.title}</li>
        `;
    }
}

customElements.define('repeated-template', RepeatedTemplate);