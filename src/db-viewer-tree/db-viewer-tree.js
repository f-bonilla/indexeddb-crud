import { LitElement, html } from 'lit';
import { styles } from './db-viewer-tree.styles.js';
import { default as c } from '../constants.js';
import '../components/tree/tree.js';

class DbViewerTree extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      treeData: { type: Array },
      treeEvent: { type: Object },
    };
  }

  constructor() {
    super();
    const hostname = window.location.hostname;
    const port = window.location.port;
    this.treeData = [
      {
        id: 'AA01',
        text: hostname + (port ? ':' + port : ''),
        open: true,
        selected: true,
        type: 'node-server',
        children: [],
      },
    ];
  }

  updated(changed) {
    super.updated(changed);
    if (changed.has('treeEvent')) {
      if (this.treeEvent.hasOwnProperty('action')) {
        switch (this.treeEvent.action.action) {
          case 'create':
            this.createNode();
            break;
          case 'update':
            this.updateNode();
            break;
          case 'delete':
            this.deleteNode();
            break;
        }
      }
    }
  }

  getNodeById(id, nodes) {
    let found = false;
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      } else if (node.children?.length) {
        found = found || this.getNodeById(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  getParentNodeByChildId(id, nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].children) {
        for (let j = 0; j < nodes[i].children.length; j++) {
          if (nodes[i].children[j].id === id) {
            return nodes[i];
          }
        }
        const result = this.getParentNodeByChildId(id, nodes[i].children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  createNode() {
    const updatedTreeData = [...this.treeData];
    const node = this.getNodeById(
      this.treeEvent.entity.nodeId,
      updatedTreeData
    );
    node.children.push({
      id: Math.random().toString().split('.')[1],
      text: this.treeEvent.action.value,
      open: true,
      type: this.treeEvent.action.type,
      children: [],
    });
    this.treeData = updatedTreeData;
  }

  updateNode() {
    const updatedTreeData = [...this.treeData];
    const node = this.getNodeById(
      this.treeEvent.entity.nodeId,
      updatedTreeData
    );
    node.text = this.treeEvent.action.value;
    this.treeData = updatedTreeData;
  }

  deleteNode() {
    const updatedTreeData = [...this.treeData];
    let node = this.getParentNodeByChildId(
      this.treeEvent.entity.nodeId,
      updatedTreeData
    );
    node.children = node.children.filter(
      nodeData => nodeData.id !== this.treeEvent.entity.nodeId
    );
    updatedTreeData[0] = { ...updatedTreeData[0], selected: true };
    this.treeData = updatedTreeData;
    this.dispatchEvent(new CustomEvent(c.TREE_NODE_REMOVED));
  }

  render() {
    if (!this.treeData) return html`...`;
    return html`
      <bl-tree
        name="dbs-tree"
        .treeEvent="${this.treeEvent}"
        .treeData="${this.treeData}"
      ></bl-tree>
    `;
  }
}

customElements.define('bl-db-viewer-tree', DbViewerTree);
