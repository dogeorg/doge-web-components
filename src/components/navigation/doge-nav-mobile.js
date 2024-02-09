import { dogeComponentInit, resourceBasePath } from "../../lib/cherry.js"
import { LitElement, css, html, classMap } from "../../lib/lit/dist@3/lit-all.min.js";

export class DogeNavMobile extends LitElement {
	static styles = css`
		:host {
			@media only screen and (min-width: 980px) {
				display: none;
			}

			display: flex;
			font-size: 1.1rem;
			::slotted(a),
		}
		.menu-trigger {
			@media only screen and (min-width: 980px) {
				display: none;
			}

			display: inline-block;
			margin-right: 15px;
			fill: currentColor;
			margin-top: 2px;

			cursor: pointer;
		}

		nav {
			@media only screen and (min-width: 980px) {
				display: none;
			}

			display: flex;
			flex-direction: column;
			text-align: right;
			font-family: var(--doge-font-fancy);
			
			position: absolute;
			top: 60px;
			right: 0px;
			z-index: 99;
			
			width: auto;
			
			background: black;
			padding: .5em .7em;

		}
		::slotted(a) {
			padding:.3em;
		}

		::slotted(a),
		::slotted(a:visited) {
			color: #a9a9b3;
			text-decoration: none;
		}

		::slotted(a:hover) {
			color: white;
			text-decoration: underline;
		}

		::slotted(a[active]) {
			color: var(--doge-yellow);
			text-decoration: underline;
		}
		::slotted(span) {
			display: block;
			margin-top: 1em;
      		color: var(--doge-purple);
      		font-family: sans-serif;
      		font-size: 0.8rem;
      		padding:.3em;
      		padding-bottom: 0em;
    	}
		.hidden {
			display: none;
		}
	`;

	static properties = {
		isListHidden: {}
	}

	constructor() {
		super();
		this.isListHidden = true;
	}

	connectedCallback() {
		super.connectedCallback();
   		dogeComponentInit();
    }

    _handleNavMenuClick() {
    	this.isListHidden = !this.isListHidden;
    }

	render() {
		const classes = { hidden: this.isListHidden }
		return html`
			<span class="menu-trigger" @click=${this._handleNavMenuClick}>
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 18v1H0v-1h24zm0-6v1H0v-1h24zm0-6v1H0V6h24z" fill="#1040e2"></path><path d="M24 19H0v-1h24v1zm0-6H0v-1h24v1zm0-6H0V6h24v1z"></path></svg>
			</span>
			<nav class=${classMap(classes)}>
				<slot name="controls"></slot>
				<slot></slot>
			</nav>
		`;
	}
}
customElements.define("doge-nav-mobile", DogeNavMobile);