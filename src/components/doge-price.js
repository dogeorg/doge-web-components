import { dogeComponentInit, resourceBasePath } from "../lib/cherry.js"
import { LitElement, css, html } from "../lib/lit/dist@3/lit-core.min.js";

export class DogePrice extends LitElement {
  static styles = css``;

  static properties = {
    interval: { type: Number },
    currency: { type: String },
    price: { type: Number, attribute: true, reflect: true },
  };

  constructor() {
    super();
    this.interval = 300000; // Default interval is 5 minutes
    this.currency = 'usd'; // Default currency is USD
    this.price = 0; // Initialize the price property
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPrice();
    setInterval(() => this.fetchPrice(), this.interval);
  }

  async fetchPrice() {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=${this.currency}`);
      const data = await response.json();
      const price = data.dogecoin[this.currency];
      this.price = price;
    } catch (error) {
      console.error('Error fetching Dogecoin price:', error);
    }
  }

  render() {
    return html`
      <span>${this.price} ${this.currency.toUpperCase()}</span>
    `;
  }
}

customElements.define('doge-price', DogePrice);