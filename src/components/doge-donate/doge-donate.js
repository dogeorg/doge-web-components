import { 
  LitElement, css, html 
} from "../../lib/doge-init.js"

import { DogeQR } from "../doge-qr/doge-qr.js"

export class DogeDonate extends LitElement {
  static properties = {
    address: {},
    tint: { type: String },
    theme: { type: String },
    selectedAmount: { type: Number },
    customAmount: { type: Number },
    isCustomAmount: { type: Boolean },
    presets: { 
      type: Array,
      converter: {
        fromAttribute: (value) => {
          if (!value) return [69, 500, 1337, 9001]; // default values
          return value.split(',')
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num) && num > 0);
        },
        toAttribute: (value) => value.join(', ')
      }
    },
    // DogeQR specific properties
    size: { type: String },
    background: {},
    fill: {},
    img: { type: String }
  };

  static styles = css`
    :host {
      --tint-color: #ffc107;
    }

    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
      align-items: center;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .amount-btn {
      padding: .33rem;
      border: 1px solid var(--tint-color);
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: bold;
      transition: all 0.2s ease;
      color: #444;
    }

    .amount-btn:hover {
      background: color-mix(in srgb, var(--tint-color) 15%, white);
    }

    .amount-btn.selected {
      background: var(--tint-color);
      color: black;
    }

    .custom-amount {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
    }

    .custom-amount input {
      padding: 0.33rem;
      padding-left: 1.33rem;
      border: 1px solid var(--tint-color);
      border-radius: 4px;
      width: 100%;
      font-size: .9rem;
      font-weight: bold;
      text-align: center;
    }

    .custom-amount input.has-value {
      background: var(--tint-color);
      color: black;
    }

    .custom-amount input.has-value:focus {
      background: var(--tint-color);
      color: black;
    }

    .qr-section {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    @media (max-width: 600px) {
      .container {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    this.selectedAmount = 500;
    this.customAmount = null;
    this.isCustomAmount = false;
    this.presets = [69, 500, 1337, 9001];

    this.tint = null;

    // Set default values for QR properties
    this.size = 'md';
    this.background = null;
    this.fill = null;
    this.img = null;
  }

  getTintColor() {
    // If user provided tint, use it
    if (this.tint) {
      return this.tint;
    }
    // Otherwise get from theme
    const QR = this.shadowRoot.querySelector('doge-qr');

    if (!QR) return;

    if (this.theme) {
      return QR.getThemeColors(this.theme).secondary;
    }
    // Fallback
    return QR.getThemeColors().primary;
  }

  handleOptionClick(amount) {
    this.selectedAmount = amount;
    this.customAmount = null;
    this.isCustomAmount = false;
    
    // Clear the input value
    const input = this.shadowRoot.querySelector('.custom-amount input');
    if (input) {
      input.value = '';
    }
  }

  handleCustomAmountInput(e) {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
        this.customAmount = value;
        this.selectedAmount = value;
        this.isCustomAmount = true;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('theme') || changedProperties.has('tint')) {
      
      // Update the CSS custom property when theme or tint changes
      this.style.setProperty('--tint-color', this.getTintColor());
    }
  }

  render() {
    this.style.setProperty('--tint-color', this.getTintColor());

    return html`
      <div class="container">
        <div class="options">
          ${this.presets.map(amount => html`
            <button 
              class="amount-btn ${this.selectedAmount === amount && !this.isCustomAmount ? 'selected' : ''}"
              @click=${() => this.handleOptionClick(amount)}
            >
              Ð${amount}
            </button>
          `)}
          <div class="custom-amount">
            <input
              min="1"
              type="number"
              placeholder="Other"
              @input=${this.handleCustomAmountInput}
              .value=${this.customAmount || ''}
              class=${this.isCustomAmount ? 'has-value' : ''}
            >
          </div>
        </div>
        
        <div class="qr-section">
          <doge-qr
            .address=${this.address}
            .theme=${this.theme}
            .amount=${this.selectedAmount}
            .size=${this.size}
            .background=${this.background}
            .fill=${this.fill}
            .img=${this.img}
          ></doge-qr>
        </div>
      </div>
    `;
  }
}

customElements.define("doge-donate", DogeDonate);