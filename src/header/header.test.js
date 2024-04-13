import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './header.js';

describe('Header created', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<bl-header></bl-header>`);
    await el.updateComplete;
  });

  it('renders a header', () => {
    const header = el.shadowRoot.querySelector('header');
    expect(header).to.exist;
    const h1 = header.querySelector('h1');
    const languageMenu = header.querySelector('bl-language-menu');
    expect(h1).to.exist;
    expect(languageMenu).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
