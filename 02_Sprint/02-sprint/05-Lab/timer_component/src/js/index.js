import { LitElement, html, css } from "lit";

class GoTimer extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }

            .menu {
                margin: 3rem;
            }

            .link {
                color: #8B0000;
                cursor: pointer;
                padding: 0 0.8rem;
                text-decoration: none;
                font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Arial";
                font-size: 1rem;
            }

            .link:hover {
                color: #808000;
                text-decoration: underline;
            }
        `;
    }

    static get properties() {
        return {
            currentView: { type: String },
        };
    }

    constructor() {
        super();
        this.currentView = 'home';
    }

    render() {
        return html`
            <nav class="menu">
                <a href="#" @click=${() => this._navigate('home')} class="link">Inicio</a>
                <a href="#" @click=${() => this._navigate('timer')} class="link">Timer Component</a>
            </nav>

            <div>
                ${this._getCurrentView()}
            </div>
        `;
    }

    _navigate(view) {
        this.currentView = view;
    }

    _getCurrentView() {
        switch (this.currentView) {
            case 'home':
                return html`<home-component></home-component>`;
            case 'timer':
                return html`<timer-component></timer-component>`;
        }
    }
}

customElements.define('go-timer', GoTimer);

class HomeComponent extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
            }

            .imagen-timer {
                width: 100%;
                object-fit: cover;
            }

        `;
    }

    static get properties() {
        return {
            urlImage: { type: String},
            alt: { type: String },
        };
    }

    constructor() {
        super();
        this.urlImage = "src/img/time.jpg";
        this.alt = "Imagen Timer"
    }

    render() {
        return html`
            <div>
                <img src="${this.urlImage}" alt="${this.alt}" class="imagen-timer"/>
            </div>
        `;
    }
}

customElements.define('home-component', HomeComponent);

class TimerComponent extends LitElement {

    static get styles() {

        return css`
            :host {
                display: flex;
            }

            .timer__body {
                display: flex;
                flex-direction: column;
                margin: 1rem auto;
                color: #c9ac82;
            }

            .timer__container {
                display: flex;
                flex-direction: row;
                background: white;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                height: auto;
                padding: 1.2rem;
                border-radius: 0.5rem;
            }

            .timer__screen {
                margin: 1.5rem 0;
                width: 100%
            }

            .timer__time {
                border: none;
                box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
                color: #000000;
                width: 2rem;
                height: 2rem;
                text-align: center;
            }

            .timer__cta {
                border: none;
                box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
                border-radius: 0.4rem;
                background: transparent;
                padding: 0.7rem 1.2rem;
                cursor: pointer;
            }

            .timer__cta:hover {
                background: #DC143C;
                color: #ffffff;
            }

            .timer__play {
                background: #c9ac82;
                color: white;
            }
        `;
    }

    static get properties() {
        return {
            title: { type: String },
            pause: { type: String },
            play: { type: String },
            reset: { type: String },
            hora: { type: String },
            minutos: { type: String },
            segundos: { type: String }
        }
    }

    constructor() {
        super();
        this.title = "Timer Componente";
        this.pause = "Pause";
        this.play = "Play";
        this.reset = "Reset";
        this.hora = "";
        this.minutos = "";
        this.segundos = "";
    }

    render() {
        return html`
            <div class="timer__body">
                <h1 class="timer__title">${this.title}</h1>

                <div class="timer__container">

                    <div class="timer__screen">
                        <input
                            class="timer__time timer__hora"
                            .value="${this.hora}"
                            placeholder="00"
                            @input="${(e) => this._validateTimeInput(e)}" /> :
                        <input
                            class="timer__time timer__minutos"
                            .value="${this.minutos}"
                            placeholder="00"
                            @input="${(e) => this._validateTimeInput(e)}" /> :
                        <input
                            class="timer__time timer__segundos"
                            .value="${this.segundos}"
                            placeholder="00"
                            @input="${(e) => this._validateTimeInput(e)}" />
                    </div>

                    <div class="timer__buttons">
                        <button class="timer__cta timer__pause">
                            ${this.pause}
                        </button>
                        
                        <button class="timer__cta timer__play"
                                @click=${this._btnPlay}>
                            ${this.play}
                        </button>
                        
                        <button class="timer__cta timer__reset" type="button"
                                @click="${this._handleReset}">
                            ${this.reset}
                        </button>
                    </div>
                
                </div> 
            </div>
        `;

    }
    
    _handleReset() {

        const inputs = this.shadowRoot.querySelectorAll('.timer__time');
        inputs.forEach(input => {
            input.value = "";
        });

    }

    _btnPlay(e) {
        console.log("click en play");
        const hora = 1;

        if ( this.hora == "" && this.minutos == "" && this.segundos == "") {
            this.hora = `0${hora}`
            console.log("hora", this.hora)
        }
        
    }

    _validateTimeInput(e) {
        let input = e.target.value;

        input = input.replace(/[^\d]/g, '');

        if (input.length > 2) {
            input = input.slice(0, 2);
        }

        this.value = input;
        e.target.value = this.value;
    }
}

customElements.define('timer-component', TimerComponent);