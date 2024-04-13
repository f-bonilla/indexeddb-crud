import { html } from 'lit';
import '../src/main-app.js';

export default {
  title: 'MainApp',
  component: 'main-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <main-app
      style="--main-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </main-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
