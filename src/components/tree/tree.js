import { LitElement, html } from 'lit';
import './tree-node/tree-node';
import { styles } from './tree.styles.js';
import { default as c } from '../../constants.js';

class Tree extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      treeData: { type: Array },
      currentNode: { type: Object },
    };
  }

  constructor() {
    super();
    this.currentNode = null;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (changedProperties.has('currentNode')) {
      this.sendTreeNodeSelectedEvent();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  nodeSelectedHandler(props) {
    const { nodeId, nodeType, nodeText, nodeSelected, nodeOpen } = props.detail;
    this.currentNode = { nodeId, nodeType, nodeText, nodeSelected, nodeOpen };
    this.requestUpdate();
    this.sendTreeNodeSelectedEvent();
  }

  sendTreeNodeSelectedEvent() {
    this.dispatchEvent(
      new CustomEvent(c.TREE_NODE_SELECTED, {
        composed: true,
        detail: { ...this.currentNode },
      })
    );
  }

  renderNode(node) {
    if (node.selected && !this.currentNode) {
      this.currentNode = {
        nodeId: node.id,
        nodeType: node.type,
        nodeText: node.text,
        nodeSelected: node.selected,
        nodeOpen: node.open,
      };
    }
    const hasChildren = node.children && node.children.length > 0;
    return html`
      <bl-tree-node
        id="${node.id}"
        type="${node.type}"
        text="${node.text}"
        ?children="${hasChildren}"
        ?selected="${node.id === this.currentNode?.nodeId}"
        ?open="${node.open}"
        @node-selected="${this.nodeSelectedHandler}"
      >
        <div slot="content">
          ${hasChildren
            ? node.children.map(child => this.renderNode(child))
            : ''}
        </div>
      </bl-tree-node>
    `;
  }

  render() {
    return html` ${this.treeData.map(node => this.renderNode(node))} `;
  }
}

customElements.define('bl-tree', Tree);
