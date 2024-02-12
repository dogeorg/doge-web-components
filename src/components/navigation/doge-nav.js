import { dogeComponentInit, resourceBasePath } from "../../lib/cherry.js"
import { LitElement, css, html, classMap } from "../../lib/lit/dist@3/lit-all.min.js";

export class DogeNav extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      display: block;
      position: fixed;
      top: 0px;
      z-index: 999;

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
      align-items: center;
      justify-content: space-between;

      color: #a9a9b3;
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

    header nav {
      display: none;
      @media only screen and (min-width: 980px) {
        display: flex;
      }
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 0 15px;

      /* TODO: theme */
      font-family: var(--doge-font-fancy);
    }

    ::slotted(a),
    ::slotted(a:visited) {
      color: #a9a9b3;
      text-decoration: none;
      white-space: nowrap;
    }

    ::slotted(a) {
      display: inline-block;
      margin: 0 9px;
    }

    ::slotted(a:hover) {
      color: #ffffff;
      text-decoration: underline;
    }

    ::slotted(a[active]) {
      color: var(--doge-yellow);
      text-decoration: underline;
    }

    ::slotted(div) {
      margin: 1px 9px 0px 9px;
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
        <slot name="mobile"></slot>
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
      right: 0px;
      text-align: right;
      padding-top: 18px;
      padding-bottom: 9px;
    }

    ::slotted(a),
    ::slotted(a:visited) {
      color: #a9a9b3;
      text-decoration: none;
    }

    ::slotted(a:first-child) {
      padding: 0px;
    }

    ::slotted(a) {
      padding: 4.5px 18px;
      white-space: nowrap;
      display: block;
    }

    ::slotted(a[active]) {
      display: block;
    }

    ::slotted(a:hover) {
      color: white;
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
    active: { attribute: true, reflect: true },
    spa: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host([active="true"]) .dropdown-content {
      display: block;
    }

    .wrapper {
      position: relative;
      display: inline-block;
      background-color: var(--doge-black);
    }

    .wrapper:hover .dropdown-content {
      display: block;
    }

    .dropdown-content.active {
      display: block;
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
      font-size: 1.1rem;
      line-height: 1.3;
    }
  `;

  constructor() {
    super();
    this.selected = "foundation";
    this.active = false;
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

  _itemClickHandler(e) {
    if (this.spa) {
      this.selected =
        e.target === e.currentTarget ? "container" : e.target.name;
    }
  }

  _logoClickHandler(e) {
    this.active = !this.active
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="wrapper">
        <a @click=${this._logoClickHandler} class="selected-item-wrap">
          <img
            src="https://fetch.dogecoin.org/resources/img/logos/text/logo-text-foundation.png"
            alt="${this.selected} logo ${this.spa}"
          />
        </a>
        <div class="dropdown-content" @click="${this._itemClickHandler}">
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
        return "Unleashing Creativity, One Shibe at a Time: The hub for Dogecoin Developers.";
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

