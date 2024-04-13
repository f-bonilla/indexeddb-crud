import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import i18next from 'i18next';
import i18nConfig from '../../i18n-config.js';
import './entity-creator.js';

describe('EntityCreator created', () => {
  let el;

  beforeEach(async () => {
    await i18nConfig('es');
    el = await fixture(
      html`<bl-entity-creator
        label="label text for this test"
      ></bl-entity-creator>`
    );
    await el.updateComplete;
  });

  it('renders a div', () => {
    const form = el.shadowRoot.querySelector('form');
    expect(form).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
