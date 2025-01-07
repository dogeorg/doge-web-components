import { 
  LitElement, css, html 
} from "../../lib/doge-init.js"

import { DogeQR } from "../doge-qr/doge-qr.js"

export class DogeDonate extends LitElement {
  static properties = {
    address: { type: String },
    tint: { type: String },
    theme: { type: String },
    selectedAmount: { type: Number },
    customAmount: { type: Number },
    isCustomAmount: { type: Boolean },
    listLabel: { type: String },
    qrLabel: { type: String },
    presets: { 
      type: Array,
      converter: {
        fromAttribute: (value) => {
          if (!value) return [69, 500, 1337, 9001];
          return value.split(',')
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num) && num > 0);
        },
        toAttribute: (value) => value.join(', ')
      }
    },
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
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: .77rem;
      flex: 1;
      justify-content: center;
    }

    .options {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .qr-section {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .qr-section .section-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .label {
      font-weight: bold;
      font-family: 'Comic Neue';
      font-size: 1.1rem;
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

    @media (max-width: 600px) {
      .container {
        grid-template-columns: 1fr;
      }

      .section.qr {
        gap: 0em;
      }
    }

    slot[name="label-list"],
    slot[name="label-qr"] {
      text-align: center;
      width: auto;
      margin: 0 auto;
      display: block;
      max-width: fit-content;
    }

    ::slotted(img) {
      width: auto;
      height: auto;
    }
  `;

  constructor() {
    super();
    this.selectedAmount = 500;
    this.customAmount = null;
    this.isCustomAmount = false;
    this.presets = [69, 500, 1337, 9001];
    this.listLabel = ""
    this.qrLabel = ""
    this.tint = null;
    this.size = 'md';
    this.background = null;
    this.fill = null;
    this.img = null;
  }

  getTintColor() {
    if (this.tint) {
      return this.tint;
    }
    const QR = this.shadowRoot.querySelector('doge-qr');

    if (!QR) return;

    if (this.theme) {
      return QR.getThemeColors(this.theme).secondary;
    }
    return QR.getThemeColors().primary;
  }

  handleOptionClick(amount) {
    this.selectedAmount = amount;
    this.customAmount = null;
    this.isCustomAmount = false;
    
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
      this.style.setProperty('--tint-color', this.getTintColor());
    }
  }

  render() {
    this.style.setProperty('--tint-color', this.getTintColor());

    return html`
      <header slot="header" part="header"></header>
      <div class="container">
        <div class="section">
          <slot name="label-list" class="label" part="label-list">${this.listLabel}</slot>
          <div class="section-content">
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
        </div>
        
        <div class="section qr">
          <slot name="label-qr" class="label" part="label-qr">${this.qrLabel}</slot>
          <div class="section-content">
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
      </div>
      <footer slot="footer" part="footer"></footer>
    `;
  }
}

customElements.define("doge-donate", DogeDonate);