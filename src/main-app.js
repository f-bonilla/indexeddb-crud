import { LitElement, html, css } from 'lit';
import i18nConfig from './i18n-config.js';
import './db-viewer-tree/db-viewer-tree.js';
import './entity-manager/entity-manager.js';
import './header/header.js';

class MainApp extends LitElement {
  static get styles() {
    return css`
      :host {
        contain: content;
        display: flex;
        flex-direction: column;
        background: aliceblue;
        width: 100%;
      }
      main {
        display: flex;
        height: 100%;
        max-height: 100%;
        margin: 10px;
        overflow: hidden;
      }
      main bl-db-viewer-tree {
      }

      main entity-manager {
        width: max-content;
      }
    `;
  }

  static get properties() {
    return {
      loading: { type: Boolean },
      dbViewerTreeNodeSelected: { type: Object },
      treeEvent: { type: Object },
    };
  }

  constructor() {
    super();
    this.loading = true;
    this.treeEvent = {};
    this.dbViewerTreeNodeSelected = {};
    this.init();
  }

  async init() {
    await i18nConfig('es');
    this.loading = false;
  }

  treeNodeSelectedHandler(props) {
    this.dbViewerTreeNodeSelected = props.detail;
  }

  treeNodeRemovedHandler() {
    this.dbViewerTreeNodeSelected = null;
  }

  entityActionFinishHandler(props) {
    this.treeEvent = { ...props.detail };
  }

  render() {
    if (this.loading) return html`<div>...</div>`;
    return html`
      <bl-header></bl-header>
      <main>
        <bl-db-viewer-tree
          .treeEvent="${this.treeEvent}"
          @tree-node-selected="${this.treeNodeSelectedHandler}"
          @tree-node-removed="${this.treeNodeRemovedHandler}"
        ></bl-db-viewer-tree>
        <bl-entity-manager
          .entitySelected="${this.dbViewerTreeNodeSelected}"
          @entity-action-finish="${this.entityActionFinishHandler}"
        ></bl-entity-manager>
      </main>
    `;
  }
}

customElements.define('main-app', MainApp);
