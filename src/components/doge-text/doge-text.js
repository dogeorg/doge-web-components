import { LitElement, css, html, styleMap, dogeComponentInit } from "../../lib/doge-init.js";

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
    }
  `;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.c = "black";

    // Bind functions to this
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    dogeComponentInit();
    this.addEventListener('mousedown', this.dragstart);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.dragstart);
    // Clean up mousemove and mouseup just in case the element is removed while dragging
    this.removeDraggingEventListeners();
  }

  dragstart(e) {
    // Prevent default dragging of selected content
    e.preventDefault();

    // Set the initial offset position
    this.initialX = e.clientX - this.x;
    this.initialY = e.clientY - this.y;

    // Attach the listeners for mousemove and mouseup
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(event) {
    // Calculate the new position
    this.x = event.clientX - this.initialX;
    this.y = event.clientY - this.initialY;

    // Request an update to re-render the component with new positions
    this.requestUpdate();
  }

  onMouseUp(event) {
    // Stop the dragging process
    this.removeDraggingEventListeners();
  }

  removeDraggingEventListeners() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
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
      </div>
    `;
  }
}

customElements.define("doge-text", DogeText);