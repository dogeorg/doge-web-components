import { 
  LitElement, html, dogeComponentInit
} from "../../lib/doge-init.js"

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/components/carousel/carousel.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/components/carousel-item/carousel-item.js';

import { styles } from "./styles.js";

export class DogeReel extends LitElement {
  static styles = styles;

  constructor() {
    super();
    
    // Load the theme CSS dynamically
    const linkElem = document.createElement('link');
    linkElem.rel = 'stylesheet';
    linkElem.href = window.location.origin + '/lib/shoelace/cdn@2.14.0/themes/light.css';
    document.head.appendChild(linkElem);
    
    // Add theme class to host
    this.classList.add('sl-theme-light');
  }

  firstUpdated() {
    dogeComponentInit();
  }

  render() {
    return html`
      <div>
        <sl-carousel slides-per-page="3" slides-per-move="1" loop autoplay mouse-dragging autoplayInterval="500" class="scroll-hinted">
          <sl-carousel-item style="background: var(--sl-color-red-200);">Slide 1</sl-carousel-item>
          <sl-carousel-item style="background: var(--sl-color-orange-200);">Slide 2</sl-carousel-item>
          <sl-carousel-item style="background: var(--sl-color-yellow-200);">Slide 3</sl-carousel-item>
          <sl-carousel-item style="background: var(--sl-color-green-200);">Slide 4</sl-carousel-item>
          <sl-carousel-item style="background: var(--sl-color-blue-200);">Slide 5</sl-carousel-item>
          <sl-carousel-item style="background: var(--sl-color-violet-200);">Slide 6</sl-carousel-item>
        </sl-carousel>
      </div>
    `
  }
}

customElements.define('doge-reel', DogeReel);