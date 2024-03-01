import { LitElement, css, html, styleMap } from "../../lib/doge-init.js";

export class DogeText extends LitElement {
  static properties = {
    x: { type: Number },
    y: { type: Number },
    r: { type: Number }, // rotation in degrees
    c: { type: String }, // color as a string
  };

  static styles = css`
    :host {
      display: block;
      position: absolute;
      transform-origin: center;
      white-space: nowrap;
      user-select: none;
      font-size: 2em;
      /* additional styles for text, like font settings, can be added here */
    }
  `;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.c = "black";
  }

  render() {
    const styles = {
      left: `${this.x}px`,
      top: `${this.y}px`,
      transform: `translate(-50%, -50%) rotate(${this.r}deg)`,
      color: this.c,
      position: "absolute",
    };

    return html`
      <div style="${styleMap(styles)}">
        <slot></slot>
        <!-- This will project the content inside <doge-text> -->
      </div>
    `;
  }
}

customElements.define("doge-text", DogeText);