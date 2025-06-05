import { LitElement, html, css } from 'lit';

export class DogeForm extends LitElement {
  static properties = {
    width: { type: String },
    height: { type: String },
    title: { type: String },
    subtitle: { type: String },
    questions: { 
      type: Array,
      hasChanged(newVal, oldVal) {
        return true;
      }
    },
    submitButtonText: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Comic Neue';
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: var(--form-width, 100%);
      height: var(--form-height, auto);
      margin: 0 auto;
      padding: 64px 72px;
      background: var(--form-background, white);
      border-radius: var(--form-radius, 32px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      box-sizing: border-box;
      max-width: 100%;
    }

    .form-header {
      text-align: center;
      margin-bottom: 1rem;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--doge-text-color, #333);
      margin: 0 0 0.5rem 0;
    }

    .form-subtitle {
      font-size: 1rem;
      font-weight: 500;
      color: var(--doge-text-color-secondary, #666);
      margin: 0;
    }

    .question-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .question-heading {
      font-weight: 700;
      color: var(--doge-text-color, #333);
      margin: 0;
      white-space: pre-line;
    }

    .question-subtitle {
      font-weight: 400;
      color: var(--doge-text-color-secondary, #666);
      margin: 0;
      white-space: pre-line;
    }

    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--doge-textarea-border-color, #ccc);
      border-radius: 4px;
      font-size: 1rem;
      resize: none;
      min-height: 80px;
      font-family: inherit;
      box-sizing: border-box;
      margin: 0;
      background: var(--doge-textarea-background, white);
      color: var(--doge-textentry-text-color, #333);
    }

    textarea::placeholder {
      color: var(--doge-textentry-placeholder-text-color, #999);
    }

    textarea:focus {
      outline: none;
      border-color: var(--doge-primary-color, #4CAF50);
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
    }

    button {
      background-color: var(--doge-primary-color, #4CAF50);
      color: var(--doge-button-text-color, white);
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 700;
      transition: background-color 0.2s;
      align-self: center;
      font-family: 'Comic Neue', cursive;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    button:hover {
      background-color: var(--doge-primary-hover-color, #45a049);
    }
  `;

  constructor() {
    super();
    this.width = '100%';
    this.height = 'auto';
    this.title = '';
    this.subtitle = '';
    this.questions = [];
    this.submitButtonText = 'Submit';
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const responses = {};
    
    // Collect responses for each question
    this.questions.forEach((question, index) => {
      const response = formData.get(`question${index}`);
      responses[question.title] = response;
    });
    
    // Dispatch event for any listeners
    this.dispatchEvent(new CustomEvent('doge-form-submit', {
      detail: { responses },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <form 
        @submit=${this.handleSubmit}
        style="--form-width: ${this.width}; --form-height: ${this.height};"
      >
        ${this.title || this.subtitle ? html`
          <div class="form-header">
            ${this.title ? html`<h2 class="form-title">${this.title}</h2>` : ''}
            ${this.subtitle ? html`<p class="form-subtitle">${this.subtitle}</p>` : ''}
          </div>
        ` : ''}

        ${Array.isArray(this.questions) ? this.questions.map((question, index) => {
          return html`
            <div class="question-group">
              <h3 class="question-heading">${question.title}</h3>
              ${question.subtitle ? html`<p class="question-subtitle">${question.subtitle}</p>` : ''}
              <textarea 
                name="question${index}" 
                required 
                placeholder="${question.placeholder || ''}"
              ></textarea>
            </div>
          `;
        }) : ''}

        <button type="submit">
          ${this.submitButtonText}
        </button>
      </form>
    `;
  }
}

customElements.define('doge-form', DogeForm);