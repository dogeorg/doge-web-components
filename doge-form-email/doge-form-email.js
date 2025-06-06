import { html } from 'lit';
import { DogeForm } from '../doge-form/doge-form.js';

export class DogeFormEmail extends DogeForm {
  static properties = {
    emailTo: { type: String, attribute: 'email-to' },
    emailSubject: { type: String, attribute: 'email-subject' },
  };

  constructor() {
    super();
    this.emailTo = '';
    this.emailSubject = 'Form Submission';
    this.submitButtonText = 'Submit via email';
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Submission and response collection handled by parent
    super.handleSubmit(e);
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.addEventListener('doge-form-submit', (e) => {
      const responses = e.detail.responses;
      
      // Convert responses object to array of formatted strings
      const formattedResponses = Object.entries(responses).map(([question, answer]) => 
        `${question}\n${answer}\n`
      );
      
      const emailBody = formattedResponses.join('\n');
      const mailtoLink = `mailto:${this.emailTo}?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoLink;

      // Dispatch email-specific event
      this.dispatchEvent(new CustomEvent('doge-form-email-submit', {
        detail: { responses, emailBody, mailtoLink },
        bubbles: true,
        composed: true
      }));
    });
  }

  render() {
    return html`
      ${super.render()}
    `;
  }
}

customElements.define('doge-form-email', DogeFormEmail); 