import { css } from 'lit';

export const styles = [
  css`
    :host {
      contain: content;
      display: block;
      height: max-content;
      padding: 10px;
      background-color: var(--bg-primary);
    }

    :host > div:first-child {
    }

    bl-entity-creator {
      margin-bottom: 10px;
    }
  `,
];
