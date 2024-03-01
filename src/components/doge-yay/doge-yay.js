import { LitElement, css, html } from "../../lib/doge-init.js";
import "../doge-text.js";

export class DogeYay extends LitElement {
  static properties = {
    useSlotted: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      transform-origin: center;
      white-space: nowrap;
      user-select: none;
      position: relative;
      font-family: "Comic Sans MS", cursive, sans-serif;
    }
    .meme-container {
      position: relative;
      overflow: hidden; /* Add this to hide text spilling over */
    }
    img {
      width: var(--image-width);
      display: block; /* remove extra space beneath the image */
    }
    .meme-text {
      position: absolute;
      font-size: 2em;
      white-space: nowrap;
      transform-origin: center;
    }
    ::slotted([slot="baked"]) {
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    ::slotted(img) {
      display: block;
      max-width: 100%;
      height: auto;
    }
  `;

  constructor() {
    super();
    this.useSlotted = false; // By default, do not use slotted elements
    this.texts = [
      { text: "such wow", color: "pink" },
      { text: "so doge", color: "blue" },
      { text: "very meme", color: "yellow" },
      { text: "much cool", color: "green" },
      { text: "such fun", color: "red" },
    ];
  }

  firstUpdated() {
    this.addEventListener("dblclick", this.handleDoubleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dblclick", this.handleDoubleClick);
  }

  handleDoubleClick = (event) => {
    // Ensure the double-click is on the meme-container, not just on a meme-text
    let serializedStates = "";
    const memeTexts = this.shadowRoot.querySelectorAll(".meme-text");

    memeTexts.forEach((memeText) => {
      const computedStyle = window.getComputedStyle(memeText);
      const x = parseInt(computedStyle.left);
      const y = parseInt(computedStyle.top);
      const r = this.extractRotation(computedStyle.transform);
      const textContent = memeText.textContent.trim();
      const color = memeText.style.color; // Assuming inline styles are being used for color

      // Append the serialized state for each meme text
      serializedStates += `<doge-text x="${x}" y="${y}" r="${r}" c="${color}">${textContent}</doge-text>\n`;
    });

    serializedStates = `<div slot="baked">${serializedStates}</div>`;

    // Copy all serialized states to clipboard
    navigator.clipboard
      .writeText(serializedStates)
      .then(() => {
        console.log("All text states copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text states: ", err);
      });
  };

  extractRotation(transformString) {
    const values = transformString.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle;
  }

  // Function to generate a random rotation angle between -80 and 90 degrees
  getRandomRotation() {
    return Math.floor(Math.random() * 170) - 80; // -80 to 89 degrees
  }

  // Function to generate random coordinates based on the number of items
  getRandomPosition(index, total) {
    // Define a margin as a percentage to prevent text from sticking to the edges
    const margin = 15; // You can adjust this value as needed
    const gridSize = Math.ceil(Math.sqrt(total));

    // Calculate the maximum X and Y positions
    const maxX = 100 - 2 * margin;
    const maxY = 100 - 2 * margin;

    // Calculate the width and height of each grid cell
    const cellWidth = maxX / (gridSize - 1); // gridSize - 1 to ensure text can reach the right edge
    const cellHeight = maxY / (gridSize - 1);

    // Calculate row and column for the current index
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Calculate the position within the grid cell, ensuring it stays within the image bounds
    const left = margin + col * cellWidth;
    const top = margin + row * cellHeight;

    // Randomize the position slightly within the grid cell
    const finalLeft =
      col === gridSize - 1 ? left : left + Math.random() * cellWidth;
    const finalTop =
      row === gridSize - 1 ? top : top + Math.random() * cellHeight;

    return {
      top: `${finalTop}%`,
      left: `${finalLeft}%`,
    };
  }

  renderTexts() {
    return this.texts.map((item, index) => {
      const position = this.getRandomPosition(index, this.texts.length);
      return html`
        <div
          class="meme-text"
          style="
            top: ${position.top};
            left: ${position.left};
            color: ${item.color};
            transform: translate(-50%, -50%) rotate(${this.getRandomRotation()}deg);
          "
        >
          ${item.text}
        </div>
      `;
    });
  }

  render() {
    return html`
      <div class="meme-container">
        <slot></slot>
        ${
          this.useSlotted
            ? html`<slot name="baked"></slot>` // Render slotted <doge-text> elements
            : this.renderTexts() // Render generated meme texts
        }
      </div>
    `;
  }
}

customElements.define("doge-yay", DogeYay);
