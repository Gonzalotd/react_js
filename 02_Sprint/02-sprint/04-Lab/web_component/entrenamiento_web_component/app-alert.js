const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
    }

    .alert {
      display: flex;
      align-items: flex-start;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 8px 0;
      border: 1px solid transparent;
      font-family: system-ui, -apple-system, sans-serif;
      transition: opacity 0.3s ease, transform 0.3s ease;
      opacity: 1;
      transform: translateY(0);
    }

    .alert.hidden {
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
    }

    .icon {
      margin-right: 12px;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .content {
      flex: 1;
      margin-right: 12px;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 3px;
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    /* Success styles */
    .success {
      background-color: #f0f9f0;
      border-color: #4caf50;
      color: #2e7d32;
    }

    /* Info styles */
    .info {
      background-color: #f0f7ff;
      border-color: #2196f3;
      color: #1565c0;
    }

    /* Warning styles */
    .warning {
      background-color: #fffaf0;
      border-color: #ff9800;
      color: #e65100;
    }

    /* Error styles */
    .error {
      background-color: #fef0f0;
      border-color: #f44336;
      color: #c62828;
    }
  </style>

  <div class="alert hidden" role="alert" aria-live="polite">
    <div class="icon"></div>
    <div class="content"></div>
    <button class="close-btn" aria-label="Cerrar">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12.854 3.146a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.708-.708l9-9a.5.5 0 0 1 .708 0z"/>
        <path d="M3.146 3.146a.5.5 0 0 0 0 .708l9 9a.5.5 0 0 0 .708-.708l-9-9a.5.5 0 0 0-.708 0z"/>
      </svg>
    </button>
  </div>
`;

class AppAlert extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'message', 'open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.alertElement = this.shadowRoot.querySelector('.alert');
    this.iconElement = this.shadowRoot.querySelector('.icon');
    this.contentElement = this.shadowRoot.querySelector('.content');
    this.closeButton = this.shadowRoot.querySelector('.close-btn');
    
    this.handleClose = this.handleClose.bind(this);
  }

  connectedCallback() {
    this.closeButton.addEventListener('click', this.handleClose);
    this.updateStyles();
    this.updateVisibility();
  }

  disconnectedCallback() {
    this.closeButton.removeEventListener('click', this.handleClose);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      this.updateVisibility();
    } else {
      this.updateStyles();
    }
  }

  get type() {
    return this.getAttribute('type') || 'info';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get message() {
    return this.getAttribute('message') || '';
  }

  set message(value) {
    this.setAttribute('message', value);
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  updateStyles() {
    this.alertElement.classList.remove('success', 'info', 'warning', 'error');
    this.alertElement.classList.add(this.type);
    this.updateIcon();
    this.contentElement.textContent = this.message;
  }

  updateIcon() {
    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm4.3 7.3l-5 5a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.4l1.3 1.29 4.3-4.3a1 1 0 0 1 1.4 1.42z"/>
      </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm1 14a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/>
      </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm1 14a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/>
      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm4.3 12.3a1 1 0 0 1-1.4 1.4L10 11.4l-2.9 2.9a1 1 0 0 1-1.4-1.4L8.6 10 5.7 7.1a1 1 0 0 1 1.4-1.4L10 8.6l2.9-2.9a1 1 0 0 1 1.4 1.4L11.4 10z"/>
      </svg>`
    };

    this.iconElement.innerHTML = icons[this.type] || icons.info;
  }

  updateVisibility() {
    if (this.open) {
      this.alertElement.classList.remove('hidden');
    } else {
      this.alertElement.classList.add('hidden');
    }
  }

  handleClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('alert-close', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('app-alert', AppAlert);

export default AppAlert;