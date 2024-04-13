import { css } from 'lit';

export const styles = [
  css`
    :host {
      contain: content;
      display: block;
      --treeNodePadding: 0px;
      --treeNodeMargin: 0px;
      --treeNodeColor: orange;
    }
    :host div {
      display: flex;
      flex-direction: row;
      width: max-content;
    }
    :host img {
      width: 20px;
    }
    :host([selected]) div > .node-text {
      background-color: lightblue;
    }

    :host div > div:hover {
      background-color: lightyellow;
      color: black;
    }

    .tree-node-view {
      /* background-color: var(--treeNodeColor); */
      align-items: center;
      margin: var(--treeNodeMargin);
      padding: var(--treeNodePadding);
    }

    .node-children-wraper:not([open]) {
      display: none;
    }
    .node-children-wraper {
      margin-left: 20px;
    }
    .node-children-wraper:empty {
      font-size: 44;
    }
    .node-icon {
      font-family: Courier, monospace;
      /* margin-right: 6px; */
    }

    .node-text {
      padding: 4px;
    }
  `,
];
