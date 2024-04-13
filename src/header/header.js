import { LitElement, html } from 'lit';
import i18next from 'i18next';
import { styles } from './header.styles.js';
import '../components/language-menu/language-menu.js';
import EventHandler from '../event-handler.js';
import EventNames from '../event-names.js';

class Header extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      publicProperty: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.addListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  langChangeHandler() {
    this.requestUpdate();
  }

  addListeners() {
    this.boundLangChangedHandler = this.langChangeHandler;
    EventHandler.on(
      EventNames.LANG_CHANGED,
      this.boundLangChangedHandler.bind(this)
    );
  }

  removeListeners() {
    EventHandler.off(EventNames.LANG_CHANGED, this.boundLangChangedHandler);
  }

  render() {
    return html`
      <header>
        <h1>${i18next.t('header')} (dev)</h1>
        <bl-language-menu></bl-language-menu>
      </header>
    `;
  }
}

customElements.define('bl-header', Header);
