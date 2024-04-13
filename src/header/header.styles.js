import { css } from 'lit';

export const styles = [
  css`
    :host {
      contain: content;
      display: flex;
      width: inherit;
      background: var(--bg-primary);
    }
    header {
      margin: 10px;
      padding-top: 10px;
    }
  `,
];
