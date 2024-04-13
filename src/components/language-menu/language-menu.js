import { LitElement, html } from 'lit';
import i18next from 'i18next';
import { styles } from './language-menu.styles.js';
import EventHandler from '../../event-handler.js';
import EventNames from '../../event-names.js';

class LanguageMenu extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      selectedLanguage: { type: String },
    };
  }

  constructor() {
    super();
    this.selectedLanguage = i18next.language;
  }

  async changeLanguage() {
    await i18next.changeLanguage(this.selectedLanguage);
    EventHandler.emit(EventNames.LANG_CHANGED, {
      status: 'success',
      data: {
        language: this.selectedLanguage,
      },
    });
  }

  clickHandler(e) {
    if (
      e.target.classList.contains('lang-button') &&
      !e.target.hasAttribute('selected')
    ) {
      this.selectedLanguage = e.target.classList.contains('lang-es')
        ? 'es'
        : 'en';
      this.changeLanguage();
    }
  }

  render() {
    return html`<div @click="${this.clickHandler}">
      <span
        class="lang-button lang-es"
        ?selected="${this.selectedLanguage === 'es'}"
        >español</span
      >
      <span
        class="lang-button lang-en"
        ?selected="${this.selectedLanguage === 'en'}"
        >english</span
      >
    </div>`;
  }
}

customElements.define('bl-language-menu', LanguageMenu);
