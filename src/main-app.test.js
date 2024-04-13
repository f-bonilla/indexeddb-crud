import { html } from 'lit';
import { waitUntil, fixture, expect } from '@open-wc/testing';
import './main-app.js';

describe('MainApp created', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<main-app></main-app>`);
    await el.updateComplete;
  });

  it('MainApp should render', async () => {
    await waitUntil(() => el.loading === false);
    // i18n ready
    expect(el.shadowRoot.querySelector('bl-header')).to.exist;
    expect(el.shadowRoot.querySelector('bl-db-viewer-tree')).to.exist;
    expect(el.shadowRoot.querySelector('bl-entity-manager')).to.exist;
  });
});
