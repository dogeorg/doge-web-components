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
    emailTo: { type: String },
    emailSubject: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--doge-font-family, system-ui, -apple-system, sans-serif);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: var(--form-width, 100%);
      height: var(--form-height, auto);
      margin: 0 auto;
      padding: 1.5rem;
      background: var(--form-background, white);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      box-sizing: border-box;
      max-width: 100%;
    }

    .form-header {
      text-align: center;
      margin-bottom: 1rem;
    }

    .form-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--doge-text-color, #333);
      margin: 0 0 0.5rem 0;
    }

    .form-subtitle {
      font-size: 1rem;
      color: var(--doge-text-color-secondary, #666);
      margin: 0;
    }

    .question-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .question-heading {
      font-weight: 500;
      color: var(--doge-text-color, #333);
      margin: 0;
      white-space: pre-line;
    }

    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--doge-border-color, #ccc);
      border-radius: 4px;
      font-size: 1rem;
      resize: vertical;
      min-height: 80px;
      font-family: inherit;
      box-sizing: border-box;
      margin: 0;
    }

    textarea:focus {
      outline: none;
      border-color: var(--doge-primary-color, #4CAF50);
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
    }

    button {
      background-color: var(--doge-primary-color, #4CAF50);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s;
      align-self: flex-end;
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
    this.question1 = '';
    this.question2 = '';
    this.question3 = '';
    this.question4 = '';
    this.question5 = '';
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
            <textarea name="question1" required></textarea>
          </div>
        ` : ''}

        ${this.question2 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question2}</h3>
            <textarea name="question2" required></textarea>
          </div>
        ` : ''}

        ${this.question3 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question3}</h3>
            <textarea name="question3" required></textarea>
          </div>
        ` : ''}

        ${this.question4 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question4}</h3>
            <textarea name="question4" required></textarea>
          </div>
        ` : ''}

        ${this.question5 ? html`
          <div class="question-group">
            <h3 class="question-heading">${this.question5}</h3>
            <textarea name="question5" required></textarea>
          </div>
        ` : ''}

        <button type="submit">Submit via email</button>
      </form>
    `;
  }
}

customElements.define('doge-form', DogeForm); 