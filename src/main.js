import {createApp} from 'vue';
import App from './App.vue';
import components from '@/components/UI';
import store from './store';
import router from './router/index.js';

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
app.use(router);
app.use(store);
app.mount('#app');
