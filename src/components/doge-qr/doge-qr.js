import { 
  resourceBasePath,
  LitElement, css, html
} from "../../lib/doge-init.js"
import "../../../resources/blocks/qr-code-styling@1.5.0/qr-code-styling.js";

export class DogeQR extends LitElement {
	static properties = {
		address: {},
    amount: {},
    background: {},
    fill: {},
    img: {},
    size: {},
    theme: {},
		qrCanvas: {},
	};
  static sizes = {
    sm: 80,
    md: 220,
    lg: 340,
    xl: 480,
  }
  static themes = {
    'such-doge': {
      fill: "#de9a1e, #ffc107",
      background: "white",
      image: `${resourceBasePath}/img/qr/such-doge.png`,
    },
    'much-dev': {
      fill: "#7020c8, #02f8da",
      background: "white",
      image: `${resourceBasePath}/img/qr/much-dev.png`,
    },
    'so-coin': {
      fill: "#ac8639, #ceab4b",
      background: "white",
      image: `${resourceBasePath}/img/qr/so-coin.png`,
    },
    'very-community': {
      fill: "#7e3357, #f44e9f",
      background: "white",
      image: `${resourceBasePath}/img/qr/very-community.png`,
    },
  }

  static styles = css`
    .qr-container {
      display: inline-block;
    }
  `;

	constructor() {
		super();
    this.size = "md";
    this.qrCanvas;
	}

  getThemeColors(theme = null) {
    // Expose a method that returns the current themes colors in order for
    // external components to style themselves fittingly.
    if (this.theme && DogeQR.themes[this.theme]) {
      const themeColors = DogeQR.themes[this.theme].fill.split(',').map(c => c.trim());
      return {
        primary: themeColors[0],
        secondary: themeColors[1] || themeColors[0]
      };
    }

    // Default to such-doge theme
    return {
      primary: "#de9a1e",
      secondary: "#ffc107"
    };
  }

  generateColorStops(colors = "") {
    const colorArray = colors.split(',').map(c => c.trim());
    return colorArray.map((c, index) => ({
      offset: index,
      color: c,
    }));
  }

  applyTheme() {
    let image = ''
    if (this.img) {
      image = this.img
    }
    if (!this.theme) {
      return {
        image,
        backgroundOptions: {
          color: this.background
        },
        dotsOptions: {
          gradient: {
            type: "linear",
            colorStops: this.generateColorStops(this.fill)
          }
        }
      }
    }

    if (this.theme) {
      image = DogeQR.themes[this.theme].image
    }

    return {
      image,
      backgroundOptions: {
        color: DogeQR.themes[this.theme].background
      },
      dotsOptions: {
        gradient: {
          type: "linear",
          colorStops: this.generateColorStops(DogeQR.themes[this.theme].fill)
        }
      }
    }
  }

  generateQrValue() {
    if (!this.address) {
      return "Address not provided."
    }
    return `dogecoin:${this.address}${this.appendAmount()}`
  }

  appendAmount() {
    if (!this.amount || isNaN(this.amount)) return ''
    return `?amount=${this.amount}`
  }

  generateQRCode() {
    if (!this.qrCanvas) {
      this.qrCanvas = this.renderRoot.querySelector('#qrCanvas');
    }

    // Clear existing QR code
    if (this.qrCanvas.firstChild) {
      this.qrCanvas.firstChild.remove();
    }

    try {
      const qrCode = new QRCodeStyling({
        width: DogeQR.sizes[this.size],
        height: DogeQR.sizes[this.size],
        type: "svg",
        data: this.generateQrValue(),
        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: false,
          imageSize: 0.45,
          margin: 0
        },
        ...this.applyTheme(),
      });

      qrCode.append(this.qrCanvas);
    } catch (err) {
      console.error(err);
    }
  }

  firstUpdated() {
    this.generateQRCode();
  }

	connectedCallback() {
		super.connectedCallback();
	}

  updated(changedProperties) {
    if (changedProperties.has('address') ||
        changedProperties.has('amount') ||
        changedProperties.has('theme') ||
        changedProperties.has('size') ||
        changedProperties.has('background') ||
        changedProperties.has('fill') ||
        changedProperties.has('img')) {
      this.generateQRCode();
    }
  }

	render() {
		return html`
			<div class="qr-container" data-qr-value="${this.generateQrValue()}">
				<div id="qrCanvas"></div>
			</div>`;
	}
}
customElements.define("doge-qr", DogeQR);
