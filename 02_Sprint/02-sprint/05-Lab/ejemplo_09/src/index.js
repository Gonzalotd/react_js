import { LitElement, html } from "lit";

class UpdateArraysAndObject extends LitElement {

    static get properties() {
        return {
            myObject: { type: Object },
            myArrays: { type: Array }
        };
    }

    constructor() {
        super();

        this.myObject = { id: 1, text: 'foo'};
        this.myArrays = [{ id: 1 }, { id: 2 }];
    }

    render() {
        return html`
            <h3>My Arrays:</h3>
            <ul>
                ${this.myArrays.map(
                    item => html`
                        <li>${item.id}</li>
                    `
                )}
            </ul>
            <button @click=${this._addNewArrays}>add new Array</button>

            <br>
            <h3>My Objects</h3>
            <div>
                <strong>${this.myObject.id}</strong>: ${this.myObject.text}
            </div>

            <button @click=${this._updateIdObject}>change id of myObject</button>
        `;


    }

    _addNewArrays() {
        const newId = Math.round(Math.random() * 100);
        const newItem = { id: newId };
        this.myArrays = [...this.myArrays, newItem];
    }

    _updateIdObject() {
        const newId = Math.round(Math.random() * 100);
        this.myObject = {...this.myObject, id: newId}
    }

}

customElements.define('update-arrays', UpdateArraysAndObject);