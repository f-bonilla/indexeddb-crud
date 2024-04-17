import { LitElement, html } from 'lit';
import i18next from 'i18next';
import { styles } from './entity-creator.styles.js';
import { default as c } from '../../constants.js';
import EventHandler from '../../event-handler.js';
import EventNames from '../../event-names.js';

class EntityCreator extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      label: { type: String },
      type: { type: String },
      currentEntityType: { type: String },
      currentEntityText: { type: String },
      inputValue: { type: String },
    };
  }

  constructor() {
    super();
    this.addListeners();
  }

  updated(changed) {
    super.updated(changed);
    if (this.type !== this.currentEntityType) {
      this.shadowRoot.querySelector('#inputText').value = '';
    }
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

  submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntityName = formData.get('inputText').trim() || null;
    if (!newEntityName) return;
    if (e.submitter.value === 'create' || e.submitter.value === 'delete')
      this.shadowRoot.querySelector('#inputText').value = '';
    switch (e.submitter.value) {
      case 'create':
      case 'update':
      case 'delete':
        this.dispatchEvent(
          new CustomEvent(c.ENTITY_ACTION, {
            bubbles: true,
            composed: true,
            detail: {
              type: this.type,
              action: e.submitter.value,
              value: newEntityName,
            },
          })
        );
        break;
    }
  }

  getNodeStates() {
    const canCreate =
      (this.type === 'node-db' && this.currentEntityType === 'node-server') ||
      (this.type === 'node-store' && this.currentEntityType === 'node-db') ||
      (this.type === 'node-field' && this.currentEntityType === 'node-store');
    const canUpdate = this.type === this.currentEntityType;
    const canDelete = this.type === this.currentEntityType;

    const typeNotValid = this.type !== this.currentEntityType;
    const typeHasParent =
      (this.type === 'node-db' && this.currentEntityType === 'node-server') ||
      (this.type === 'node-store' &&
        (this.currentEntityType === 'node-db' ||
          this.currentEntityType === 'node-store')) ||
      (this.type === 'node-field' &&
        (this.currentEntityType === 'node-store' ||
          this.currentEntityType === 'node-field'));

    return {
      canCreate: canCreate,
      canUpdate: canUpdate,
      canDelete: canDelete,
      disabledInput: typeNotValid && !typeHasParent,
    };
  }

  handleInvalid(e) {
    this.errorMessage = '';
    if (e.target.validity.valueMissing) {
      this.errorMessage = i18next.t('common.required', e.target.name);
    } else if (e.target.validity.typeMismatch) {
      this.errorMessage = 'El valor introducido no es válido.';
    } else if (e.target.validity.tooShort) {
      this.errorMessage = `El valor debe tener al menos ${e.target.minLength} caracteres.`;
    }
    e.target.setCustomValidity(this.errorMessage);
  }

  render() {
    const { canCreate, canUpdate, canDelete, disabledInput } =
      this.getNodeStates();
    this.inputValue =
      this.type === this.currentEntityType ? this.currentEntityText : '';
    return html`
      <form @submit="${this.submitHandler}">
        <div class="title">
          <label for="inputText">${this.label}</label>
        </div>
        <input
          type="text"
          id="inputText"
          name="inputText"
          ?disabled="${disabledInput}"
          .value="${this.inputValue}"
          @invalid="${this.handleInvalid}"
          required
        />
        <button
          type="submit"
          name="submitBtn"
          value="create"
          ?disabled="${!canCreate}"
          aria-label="${i18next.t('common.create')}"
        >
          ${i18next.t('common.create')}
        </button>
        <button
          type="submit"
          name="submitBtn"
          value="update"
          ?disabled="${!canUpdate}"
        >
          ${i18next.t('common.update')}
        </button>
        <button
          type="submit"
          name="submitBtn"
          value="delete"
          ?disabled="${!canDelete}"
        >
          ${i18next.t('common.delete')}
        </button>
      </form>
    `;
  }
}

customElements.define('bl-entity-creator', EntityCreator);
