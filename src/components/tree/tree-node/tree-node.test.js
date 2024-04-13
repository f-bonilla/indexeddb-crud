import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './tree-node.js';

describe('TreeNode created', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<bl-tree-node></bl-tree-node>`);
    await el.updateComplete;
  });

  it('renders a treeNode', () => {
    const treeNode = el.shadowRoot.querySelector('.tree-node-view');
    const nodeChildrenWrapper = el.shadowRoot.querySelector(
      '.node-children-wraper'
    );
    expect(treeNode).to.exist;
    expect(nodeChildrenWrapper).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
