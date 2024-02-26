import { 
  dogeComponentInit,
  resourceBasePath,
  LitElement, css, html, classMap
} from "../../lib/cherry.js"
import "../../../resources/blocks/qr-code-styling@1.5.0/qr-code-styling.js";

export class DogeQR extends LitElement {
	static properties = {
		address: {},
    caption: {},
    colorBg: {},
    colorFg: {},
    noBorder: { type: Boolean },
    noLogo: { type: Boolean },
    size: {},
    theme: {},
		qrCanvas: {},
	};
  static sizes = {
    sm: 100,
    md: 200,
    lg: 300,
    xl: 400,
  }
  static themes = {
    'such-doge': {
      colorFg: "#de9a1e, #ffc107, #de9a1e",
      colorBg: "white",
      image: `https://fetch.dogecoin.test/resources/img/qr/such-cool-2.png`,
    },
    'much-dev': {
      colorFg: "#7020c8, #02f8da, #312147",
      colorBg: "white",
      image: `${resourceBasePath}/img/logos/circle/logo-circle-developers.png`,
    },
    'so-coin': {
      colorFg: "#ac8639, #ceab4b, #755b35",
      colorBg: "white",
      image: `${resourceBasePath}/img/logos/circle/logo-circle-dogecoin.png`,
    },
    'very-community': {
      colorFg: "#7e3357, #f44e9f, #7e3357",
      colorBg: "white",
      image: `https://fetch.dogecoin.org/resources/img/logos/circle/logo-circle-community.png`,
    }
  }

  static styles = css`
    .container {
      display: inline-block;
      padding: 0.3em;
    }
    .container[noborder="true"] {
      padding: 0 !important;
      background: red;
    }
  `;

	constructor() {
		super();
    this.colorFg = "#ffc107";
    this.colorBg = "white";
    this.size = "md";
		this.qrCanvas
	}

  generateColorStops(colors) {
    const colorArray = colors.split(',').map(c => c.trim());
    return colorArray.map((c, index) => ({
      offset: index,
      color: c,
    }));
  }

  applyTheme() {
    if (!this.theme) {
      return {
        backgroundOptions: {
          color: this.colorBg
        },
        dotsOptions: {
          gradient: {
            type: "linear",
            colorStops: this.generateColorStops(this.colorFg)
          }
        }
      }
    }

    return {
      image: this.noLogo ? '' : DogeQR.themes[this.theme].image,
      backgroundOptions: {
        color: DogeQR.themes[this.theme].colorBg
      },
      dotsOptions: {
        gradient: {
          type: "linear",
          colorStops: this.generateColorStops(DogeQR.themes[this.theme].colorFg)
        }
      }
    }
  }

	firstUpdated() {
		this.qrCanvas = this.renderRoot.querySelector('#qrCanvas');

 		try {
			const qrCode = new QRCodeStyling({
				width: DogeQR.sizes[this.size],
				height: DogeQR.sizes[this.size],
				type: "svg",
				data: this.address,
        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: false,
          imageSize: 0.5,
          margin: 0
        },
        ...this.applyTheme(),
			});

			qrCode.append(this.qrCanvas);

		} catch (err) {
			console.error(err);
		}
	}

  getBackroundColor() {
    if (this.theme) {
      return DogeQR.themes[this.theme].colorBg
    }
    return '';
  }

	connectedCallback() {
		super.connectedCallback();
		dogeComponentInit();
	}

	render() {
		return html`
			<div class="container" noborder=${this.noBorder} style="background-color: ${this.getBackroundColor()}">
				<div id="qrCanvas"></div>
				${this.caption
					? html`<span class="caption">${this.caption}</span>`
					: '' }
			</div>`;
	}
}
customElements.define("doge-qr", DogeQR);
