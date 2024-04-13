import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import i18next from 'i18next';
import i18nConfig from '../i18n-config.js';
import './entity-manager.js';

describe('EntityManager created', () => {
  let el;

  beforeEach(async () => {
    await i18nConfig('es');
    el = await fixture(html`<bl-entity-manager></bl-entity-manager>`);
    await el.updateComplete;
  });

  it('renders a div', () => {
    const expectedTypes = ['node-db', 'node-store', 'node-field'];
    const entities = el.shadowRoot.querySelectorAll('bl-entity-creator');
    const entitiesArray = Array.from(entities);
    const allTypesPresent = entitiesArray.every(entity => {
      const type = entity.getAttribute('type');
      return expectedTypes.includes(type);
    });
    expect(allTypesPresent).to.be.true;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
