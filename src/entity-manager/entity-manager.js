import { LitElement, html } from 'lit';
import i18next from 'i18next';
import { default as c } from '../constants.js';
import EventHandler from '../event-handler.js';
import EventNames from '../event-names.js';
import { styles } from './entity-manager.styles.js';
import './entity-creator/entity-creator.js';

class EntityManager extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      entitySelected: { type: Object },
    };
  }

  constructor() {
    super();
    this.entitySelected = null;
    this.dbs = [];
    this.addListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  langChangeHandler() {
    this.requestUpdate();
  }

  addListeners() {
    this.boundLangChangedHandler = this.langChangeHandler;
    EventHandler.on(
      EventNames.LANG_CHANGED,
      this.boundLangChangedHandler.bind(this)
    );
  }

  removeListeners() {
    EventHandler.off(EventNames.LANG_CHANGED, this.boundLangChangedHandler);
  }

  entityActionHandler(e) {
    const { nodeId, nodeType, nodeText } = this.entitySelected;
    const actionData = {
      action: e.detail,
      entity: { nodeId, nodeType, nodeText },
    };
    this.dispatchEvent(
      new CustomEvent(c.ENTITY_ACTION_FINISH, {
        bubbles: true,
        composed: true,
        detail: actionData,
      })
    );
  }

  render() {
    return html` <div @entity-action="${this.entityActionHandler}">
      <bl-entity-creator
        label="${i18next.t('entity-manager.db')}"
        type="node-db"
        .currentEntityType="${this.entitySelected?.nodeType}"
        .currentEntityText="${this.entitySelected?.nodeText}"
      ></bl-entity-creator>
      <bl-entity-creator
        label="${i18next.t('entity-manager.store')}"
        type="node-store"
        .currentEntityType="${this.entitySelected?.nodeType}"
        .currentEntityText="${this.entitySelected?.nodeText}"
      ></bl-entity-creator>
      <bl-entity-creator
        label="${i18next.t('entity-manager.field')}"
        type="node-field"
        .currentEntityType="${this.entitySelected?.nodeType}"
        .currentEntityText="${this.entitySelected?.nodeText}"
      ></bl-entity-creator>
    </div>`;
  }
}

customElements.define('bl-entity-manager', EntityManager);
