import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './tree.js';

describe('Tree created', () => {
  let el;

  beforeEach(async () => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    const treeData = [
      {
        id: 'AA01',
        text: hostname + (port ? ':' + port : ''),
        open: true,
        selected: true,
        type: 'node-server',
        children: [],
      },
    ];
    el = await fixture(html`<bl-tree .treeData="${treeData}"></bl-tree>`);
    await el.updateComplete;
  });

  it('renders a tree', () => {
    const tree = el.shadowRoot.querySelector('*');
    expect(tree).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
