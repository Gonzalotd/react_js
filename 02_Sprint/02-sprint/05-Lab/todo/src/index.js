import { LitElement, html, css } from 'lit';
        
class TodoItem extends LitElement {
    static properties = {
        text: { type: String },
        completed: { type: Boolean }
    };

    static styles = css`
        :host {
            display: block;
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f9f9f9;
        }

        .completed {
            text-decoration: line-through;
            opacity: 0.6;
        }

        .task-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .task-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .delete-btn {
            background-color: #ff4444;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }

        .delete-btn:hover {
            background-color: #cc0000;
        }
    `;

    constructor() {
        super();
        this.text = '';
        this.completed = false;
    }

    render() {
        return html`
            <div class="task-item">
                <div class="task-content">
                    <input 
                        type="checkbox" 
                        .checked="${this.completed}"
                        @change="${this._onToggleCompleted}">
                    <span class="${this.completed ? 'completed' : ''}">${this.text}</span>
                </div>
                <button class="delete-btn" @click="${this._onDelete}">Eliminar</button>
            </div>
        `;
    }

    _onToggleCompleted() {
        this.completed = !this.completed;
        this.dispatchEvent(new CustomEvent('todo-toggle', {
            detail: { completed: this.completed },
            bubbles: true,
            composed: true
        }));
    }

    _onDelete() {
        this.dispatchEvent(new CustomEvent('todo-delete', {
            bubbles: true,
            composed: true
        }));
    }
}

class TodoList extends LitElement {
    static properties = {
        tasks: { type: Array },
        newTaskText: { type: String }
    };

    static styles = css`
        :host {
            display: block;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        .add-task-form {
            display: flex;
            margin-bottom: 20px;
        }

        .add-task-form input {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px 0 0 4px;
            font-size: 16px;
        }

        .add-task-form button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            font-size: 16px;
        }

        .add-task-form button:hover {
            background-color: #45a049;
        }

        .empty-message {
            text-align: center;
            color: #888;
            font-style: italic;
        }
    `;

    constructor() {
        super();
        this.tasks = [];
        this.newTaskText = '';
    }

    render() {
        return html`
            <h1>Lista de Tareas</h1>
            <form class="add-task-form" @submit="${this._addTask}">
                <input 
                    type="text" 
                    placeholder="Nueva tarea..."
                    .value="${this.newTaskText}"
                    @input="${this._onInputChange}">
                <button type="submit">Añadir</button>
            </form>
            <div>
                ${this.tasks.length === 0 
                    ? html`<p class="empty-message">No hay tareas. ¡Añade una nueva!</p>`
                    : this.tasks.map((task, index) => html`
                        <todo-item 
                            .text="${task.text}"
                            .completed="${task.completed}"
                            @todo-toggle="${(e) => this._toggleTask(index, e)}"
                            @todo-delete="${() => this._deleteTask(index)}">
                        </todo-item>
                    `)
                }
            </div>
        `;
    }

    _onInputChange(e) {
        this.newTaskText = e.target.value;
    }

    _addTask(e) {
        e.preventDefault();
        if (this.newTaskText.trim() === '') return;

        this.tasks = [
            ...this.tasks,
            {
                text: this.newTaskText,
                completed: false
            }
        ];
        this.newTaskText = '';
    }

    _toggleTask(index, e) {
        this.tasks = this.tasks.map((task, i) => 
            i === index ? { ...task, completed: e.detail.completed } : task
        );
    }

    _deleteTask(index) {
        this.tasks = this.tasks.filter((_, i) => i !== index);
    }
}

customElements.define('todo-item', TodoItem);
customElements.define('todo-list', TodoList);