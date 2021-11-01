import {createApp} from 'vue';

import App from './App.vue';
import components from '@/components/UI';
import store from './store';

// Create a new store instance.

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
app.use(store);
app.mount('#app');
