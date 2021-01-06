class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummies here';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
          div {
            background-color: Salmon;
            color: LightSeaGreen;
            position: absolute;
            z-index: 10;
          }

          :host {
            background: Azure;
          }

          .highlight {
            background-color: LightPink;
          }

          ::slotted(.highlight) {
            border-bottom: 2px dotted HotPink;
          }

          .icon {
            background: Gold;
            color: LightSkyBlue;
            padding: 0.15rem 0.5rem;
            text-align: center;
            border-radius: 50%;
          }
        </style>
        <slot>Some Default Value</slot>
        <span class="icon">?</span>
    `;
  }
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('rh-tooltip', Tooltip);