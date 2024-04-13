import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './language-menu.js';

describe('LanguageMenu created', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<bl-language-menu></bl-language-menu>`);
    await el.updateComplete;
  });

  it('renders a div', () => {
    const langMenu = el.shadowRoot.querySelector('div');
    const buttonEs = langMenu.querySelector('span.lang-button.lang-es');
    const buttonEn = langMenu.querySelector('span.lang-button.lang-en');
    expect(buttonEs).to.exist;
    expect(buttonEn).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
