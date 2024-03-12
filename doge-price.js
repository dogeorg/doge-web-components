import { 
  dogeComponentInit,
  resourceBasePath,
  LitElement, css, html, classMap
} from "../../lib/doge-init.js"

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
      this.price = data.dogecoin[this.currency]
    } catch (error) {
      console.error('Error fetching Dogecoin price:', error);
    }
  }

  render() {
    return html`<span class="value">${this.price}<span class="gap"> </span><span class="currency">${this.currency.toUpperCase()}</span>`;
  }
}

customElements.define('doge-price', DogePrice);