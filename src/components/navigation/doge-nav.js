import { dogeComponentInit, resourceBasePath } from "../../lib/cherry.js"
import { LitElement, css, html } from "../../lib/lit/dist@3/lit-core.min.js";

export class DogeNav extends LitElement {
	static styles = css`
		:host {
			width: 100%;
			display: block;
			position: relative;

			/* make themeable */
			background: var(--doge-black);
			font-size: 1.1rem;
		}
		header {
			margin: 0px auto;
			display: flex;
			max-height: 100px;
			width: 100%;
			max-width: 1440px;
			justify-content: space-between;
			z-index: 99;

			color: white;
		}

		header .logo {
			display: inline-block;
			padding: 7px;
		}

		header div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 1rem;
			z-index: 99;
		}

		/* TODO: mobile styles
		header nav {
			display: flex;
			flex-direction: column;
			padding: 1rem 0;
			width: 100%;
		}*/

		header nav {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: flex-end;
			padding: 0 15px;

			/* TODO: theme */
			font-family: var(--doge-font-fancy);
		}

		::slotted(a),
		::slotted(a:visited) {
			color: white;
			text-decoration: none;
		}

		::slotted(a) {
			display: inline-block;
			margin: 0 9px;
		}

		::slotted(a:hover) {
			color: var(--doge-yellow);
			text-decoration: underline;
		}

		::slotted(a[active]) {
			color: var(--doge-yellow);
			text-decoration: underline;
		}
	`;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
   	dogeComponentInit();
   }

	render() {
		return html`
			<header>
				<div>
					<slot name="brand" class="logo"></slot>
				</div>
				<nav>
					<slot></slot>
				</nav>
			</header>
		`;
	}
}
customElements.define("doge-nav", DogeNav);

export class DogeNavList extends LitElement {
	static styles = css`
		.wrapper {
			position: relative;
			overflow: visible;
			padding: 0px 9px;
		}

		.inner {
			position: absolute;
			background: var(--doge-black);
			display: none;
			left: -9px;
			padding-top: 4.5px;
			padding-bottom: 4.5px;
		}

		::slotted(a),
		::slotted(a:visited) {
			color: white;
			text-decoration: none;
		}

		::slotted(a:first-child) {
			padding: 0px;
		}

		::slotted(a) {
			padding: 9px 18px;
			white-space: nowrap;
			display: block;
		}

		::slotted(a[active]) {
			display: block;
		}

		::slotted(a:hover) {
			color: var(--doge-yellow);
			text-decoration: underline;
		}

		.wrapper:hover .inner {
			display: block;
		}

		.arrow {
			font-size: 1.1rem;
			position: absolute;
			top: 18px;
			right: -5px;
		}
	`;

	constructor() {
		super();
	}

	render() {
		return html`
			<div class="wrapper">
				<slot name="selected"></slot>
				<div class="inner">
					<slot></slot>
				</div>
			</div>
		`;
	}
}

customElements.define("doge-nav-list", DogeNavList);

export class DogeSitePicker extends LitElement {
  static properties = {
    selected: { attribute: true, reflect: true },
    spa: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .wrapper {
      position: relative;
      display: inline-block;
      background-color: var(--doge-black);
    }

    .wrapper:hover .dropdown-content {
      display: block;
      font-size: 1.1rem;
      line-height: 1.3;
    }

    .selected-item-wrap img {
      height: 42px;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      overflow: hidden;
      width: 285px;
    }
  `;

  constructor() {
    super();
    // Declare reactive properties and set defaults.
    this.selected = "dogecoin";
    this.spa;
  }

  connectedCallback() {
    super.connectedCallback();
    dogeComponentInit();
  }

  _getURL() {
    switch (this.selected) {
      case "dogecoin":
        return "https://dogecoin.com";
        break;
      case "developers":
        return "https://dogecoin.org/developers";
        break;
      case "community":
        return "https://dogecoin.org/community";
        break;
      case "foundation":
        return "https://dogecoin.org";
      default:
        "Undefined";
    }
  }

  _clickHandler(e) {
    if (this.spa) {
      this.selected =
        e.target === e.currentTarget ? "container" : e.target.name;
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="wrapper" ${this.spa}>
        <a href="${this._getURL()}" class="selected-item-wrap">
          <img
            src="${resourceBasePath}/img/logos/text/logo-text-${this
              .selected}.png"
            alt="${this.selected} logo ${this.spa}"
          />
        </a>
        <div class="dropdown-content" @click="${this._clickHandler}">
          <doge-site-picker-item
            name="dogecoin"
            spa=${this.spa}
          ></doge-site-picker-item>
          <doge-site-picker-item
            name="developers"
            spa=${this.spa}
          ></doge-site-picker-item>
          <doge-site-picker-item
            name="community"
            spa=${this.spa}
          ></doge-site-picker-item>
        </div>
      </div>
    `;
  }
}
customElements.define("doge-site-picker", DogeSitePicker);

class DogeSitePickerItem extends LitElement {
  static properties = {
    name: {},
    spa: {},
  };
  static styles = css`
    :host {
      /* selects the wrapping element eg: <doge-site-picker-item> */
    }

    a {
      color: black;
      text-decoration: none;
    }

    a.item {
      display: flex;
      align-items: center;
      text-align: left;
      padding: 12px 16px;
      flex-wrap: wrap;
    }

    a.item:hover {
      background-color: #ffc107;
      color: black;
    }

    .item-logo {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      flex-shrink: 0;
    }

    .item-text {
      flex-grow: 1;
    }

    .item-title {
      text-transform: capitalize;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-byline {
      font-size: smaller;
      color: #666;
      word-wrap: break-word;
      white-space: normal;
      font-family: var(--doge-font-fancy);
    }

    a.item.community:hover {
      background-color: #ff27a1;
    }

    a.item.developers:hover {
      background-color: #834aff;
    }

    a.item:hover .item-byline {
      color: #222;
    }
  `;

  constructor() {
    super();
  }

  getURL() {
    switch (this.name) {
      case "dogecoin":
        return "https://dogecoin.com";
        break;
      case "developers":
        return "https://dogecoin.org/developers";
        break;
      case "community":
        return "https://dogecoin.org/community";
        break;
      case "foundation":
        return "https://dogecoin.org";
      default:
        "Undefined";
    }
  }

  getByline() {
    switch (this.name) {
      case "dogecoin":
        return "The Fun and Friendly Internet Currency Pioneering the Way for Community-Driven Crypto!";
        break;
      case "developers":
        return "Unleashing Creativity, One Shibe at a Time: The Official Hub for Dogecoin Developers.";
        break;
      case "community":
        return "Join the Pack: Dogecoin's Thriving Community - Where Camaraderie, Cryptocurrency and Memes Collide!";
        break;
      default:
        "Undefined";
    }
  }

  _linkClick(e) {
    if (this.spa) {
      e.preventDefault();
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <a
        @click="${this._linkClick}"
        href="${this.getURL()}"
        class="item ${this.name}"
      >
        <img
          class="item-logo"
          src="${resourceBasePath}/img/logos/circle/logo-circle-${this
            .name}.png"
        />
        <div class="item-text">
          <div class="item-title">${this.name}</div>
          <div class="item-byline">${this.getByline()}</div>
        </div>
      </a>
    `;
  }
}
customElements.define("doge-site-picker-item", DogeSitePickerItem);

