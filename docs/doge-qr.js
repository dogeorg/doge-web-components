import { 
  dogeComponentInit,
  resourceBasePath,
  LitElement, css, html, classMap
} from "../lib/cherry.js"
import "../../resources/blocks/qr-code-styling@1.5.0/qr-code-styling.js";

export class DogeQR extends LitElement {
	static properties = {
		address: {},
		logo: {},
		qrCanvas: {},
	};

	constructor() {
		super();
		this.address = "";
		this.logo = true;
		this.qrCanvas
	}

	firstUpdated() {
  		this.qrCanvas = this.renderRoot.querySelector('#qrCanvas');

 		try {
			const qrCode = new QRCodeStyling({
				width: 220,
				height: 220,
				type: "svg",
				data: this.address,
				image: `${resourceBasePath}/img/qr/shiba-sm.png`,
				dotsOptions: {
					color: "var(--doge-yellow)",
				},
				backgroundOptions: {
					color: "",
				},
				imageOptions: {
					crossOrigin: "anonymous",
					imageSize: 0.4
				},
			});

			qrCode.append(this.qrCanvas);

		} catch (err) {
			console.error(err);
		}
	}

	connectedCallback() {
		super.connectedCallback();
		dogeComponentInit();
	}

	render() {
		return html`<div id="qrCanvas"></div>`;
	}
}
customElements.define("doge-qr", DogeQR);
