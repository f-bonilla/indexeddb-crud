import { LitElement, html, css } from 'lit';
import { styles } from './tree-node.styles.js';
import { default as c } from '../../../constants.js';

class TreeNode extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      id: { type: String },
      type: { type: String },
      text: { type: String, attribute: true },
      children: { type: Boolean },
      selected: { type: Boolean, attribute: true, reflect: true },
      open: { type: Boolean, attribute: true, reflect: true },
    };
  }

  icons = {
    open: '[-]',
    closed: '[+]',
    noChildren: '',
  };

  constructor() {
    super();
  }

  clickHandler(e) {
    const isIcon = e.target.classList.contains('node-icon');
    if (isIcon) {
      this.open = !this.open;
      return;
    }
    if (!this.selected) {
      const data = {
        nodeId: this.id,
        nodeType: this.type,
        nodeText: this.text,
        nodeSelected: this.selected,
        nodeOpen: this.open,
      };
      this.dispatchEvent(
        new CustomEvent(c.NODE_SELECTED, {
          detail: data,
        })
      );
    }
  }

  render() {
    const iconPath = this.children
      ? this.open
        ? this.icons.open
        : this.icons.closed
      : this.icons.noChildren;
    return html`
      <div @click="${this.clickHandler}" class="tree-node-view">
        <div class="node-icon">${iconPath}</div>
        <div class="node-text">${this.text}</div>
      </div>
      <div class="node-children-wraper" ?open="${this.open}">
        <slot name="content"></slot>
      </div>
    `;
  }
}

customElements.define('bl-tree-node', TreeNode);
