import { LitElement, html, css } from 'lit';

export class DogeForm extends LitElement {
  static properties = {
    width: { type: String },
    height: { type: String },
    title: { type: String },
    subtitle: { type: String },
    question1: { type: String },
    question2: { type: String },
    question3: { type: String },
    question4: { type: String },
    question5: { type: String },
    question1Subtitle: { type: String },
    question2Subtitle: { type: String },
    question3Subtitle: { type: String },
    question4Subtitle: { type: String },
    question5Subtitle: { type: String },
    question1Placeholder: { type: String },
    question2Placeholder: { type: String },
    question3Placeholder: { type: String },
    question4Placeholder: { type: String },
    question5Placeholder: { type: String },
    emailTo: { type: String },
    emailSubject: { type: String }
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button:hover {
      background-color: var(--doge-primary-hover-color, #45a049);
    }

    .email-icon {
      width: 1.2em;
      height: 1.2em;
      fill: currentColor;
    }
  `;

  constructor() {
    super();
    this.width = '100%';
    this.height = 'auto';
    this.title = '';
    this.subtitle = '';
    this.question1 = '';
    this.question2 = '';
    this.question3 = '';
    this.question4 = '';
    this.question5 = '';
    this.question1Subtitle = '';
    this.question2Subtitle = '';
    this.question3Subtitle = '';
    this.question4Subtitle = '';
    this.question5Subtitle = '';
    this.question1Placeholder = '';
    this.question2Placeholder = '';
    this.question3Placeholder = '';
    this.question4Placeholder = '';
    this.question5Placeholder = '';
    this.emailTo = '';
    this.emailSubject = 'Form Submission';
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const responses = [];
    
    // Collect responses for each question that was provided
    for (let i = 1; i <= 5; i++) {
      const question = this[`question${i}`];
      if (question) {
        const response = formData.get(`question${i}`);
        responses.push(`${question}\n${response}\n`);
      }
    }

    // Create email body
    const emailBody = responses.join('\n');
    
    // Create mailto link
    const mailtoLink = `mailto:${this.emailTo}?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Dispatch event for any listeners
    this.dispatchEvent(new CustomEvent('doge-form-submit', {
      detail: { responses, emailBody },
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

        ${this.question1 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question1}</h3>
            ${this.question1Subtitle ? html`<p class="question-subtitle">${this.question1Subtitle}</p>` : ''}
            <textarea name="question1" required placeholder="${this.question1Placeholder}"></textarea>
          </div>
        ` : ''}

        ${this.question2 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question2}</h3>
            ${this.question2Subtitle ? html`<p class="question-subtitle">${this.question2Subtitle}</p>` : ''}
            <textarea name="question2" required placeholder="${this.question2Placeholder}"></textarea>
          </div>
        ` : ''}

        ${this.question3 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question3}</h3>
            ${this.question3Subtitle ? html`<p class="question-subtitle">${this.question3Subtitle}</p>` : ''}
            <textarea name="question3" required placeholder="${this.question3Placeholder}"></textarea>
          </div>
        ` : ''}

        ${this.question4 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question4}</h3>
            ${this.question4Subtitle ? html`<p class="question-subtitle">${this.question4Subtitle}</p>` : ''}
            <textarea name="question4" required placeholder="${this.question4Placeholder}"></textarea>
          </div>
        ` : ''}

        ${this.question5 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question5}</h3>
            ${this.question5Subtitle ? html`<p class="question-subtitle">${this.question5Subtitle}</p>` : ''}
            <textarea name="question5" required placeholder="${this.question5Placeholder}"></textarea>
          </div>
        ` : ''}

        <button type="submit">
          <svg class="email-icon" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.1665 10.2779C3.1665 7.86946 5.06131 5.8335 7.49984 5.8335H25.4998C27.9384 5.8335 29.8332 7.86946 29.8332 10.2779V22.7224C29.8332 25.1309 27.9384 27.1668 25.4998 27.1668H7.49984C5.06131 27.1668 3.1665 25.1309 3.1665 22.7224V10.2779ZM7.64319 8.50016L16.4236 14.8041C16.4514 14.824 16.4774 14.8304 16.4998 14.8304C16.5223 14.8304 16.5483 14.824 16.576 14.8041L25.3565 8.50016H7.64319ZM27.1665 10.4686C27.1234 10.5094 27.077 10.5477 27.0274 10.5833L18.1313 16.9703C17.1529 17.6727 15.8468 17.6727 14.8684 16.9703L5.97223 10.5833C5.92269 10.5477 5.87632 10.5094 5.83317 10.4686V22.7224C5.83317 23.7503 6.62465 24.5002 7.49984 24.5002H25.4998C26.375 24.5002 27.1665 23.7503 27.1665 22.7224V10.4686Z" fill="currentColor"/>
          </svg>
          Submit via email
        </button>
      </form>
    `;
  }
}

customElements.define('doge-form', DogeForm);