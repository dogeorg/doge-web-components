import { dogeComponentInit, resourceBasePath } from "../lib/cherry.js";
import { LitElement, css, html } from "../lib/lit/dist@3/lit-core.min.js";

export class DogePal extends LitElement {
	static styles = css``;

	static properties = {
		imageUrl: {},
		max_width: { attribute: true },
		max_height: { attribute: true }
	};

	constructor() {
		super();
		this.imageUrl = undefined;
		this.max_width = "100%";
		this.max_height = "600px";
	}

	connectedCallback() {
		super.connectedCallback();
		this.fetchImage();
	}

	async fetchImage() {
		try {
			const response = await fetch("https://dog.ceo/api/breed/shiba/images/random");
			const data = await response.json();
			if (data.status !== "success") {
				throw new Error('unsuccessful response from dog.ceo api')
			}
			this.imageUrl = data.message;
		} catch (error) {
			console.error("Error fetching random image:", error);
		}
	}

	render() {
		return html`
			<img src="${this.imageUrl}" style="max-width: ${this.max_width}"; max-height: ${this.max_height}" />
		`;
	}
}

customElements.define("doge-pal", DogePal);
