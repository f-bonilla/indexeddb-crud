import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './db-viewer-tree.js';

describe('DbViewer created', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<bl-db-viewer-tree></bl-db-viewer-tree>`);
    await el.updateComplete;
  });

  it('renders a div', () => {
    const tree = el.shadowRoot.querySelector('bl-tree');
    expect(tree).to.exist;
    expect(tree.treeData).to.exist;
    expect(Array.isArray(tree.treeData)).to.be.true;
  });

  it('getNodeById method should return the searched node', () => {
    const result = el.getNodeById('AA01', el.treeData);
    expect(result.id).to.equal('AA01');
  });

  it('getParentNodeByChildId method should return the searched node', () => {
    const treeData = [
      {
        id: 'AA01',
        text: 'AA01 text',
        open: true,
        selected: true,
        type: 'node-server',
        children: [
          {
            id: 'AA02',
            text: 'AA02 text',
            open: true,
            selected: true,
            type: 'node-db',
            children: [],
          },
        ],
      },
    ];
    el.treeData = treeData;
    const result = el.getParentNodeByChildId('AA02', el.treeData);
    expect(result.id).to.equal('AA01');
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
