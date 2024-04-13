import { css } from 'lit';

export const styles = [
  css`
    :host {
      contain: content;
      display: flex;
      position: absolute;
      top: 10px;
    }
    span {
      padding: 6px;
      margin: 4px;
      background-color: #f0f8ff40;
    }
    span:hover {
      background-color: lightyellow;
    }
    span[selected] {
      background-color: lightblue;
    }
  `,
];
